#this is utils.py

import csv
import subprocess
from appium import webdriver

def get_adb_output(command):
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    stdout, stderr = process.communicate()
    if process.returncode != 0:
        raise Exception(f"Error executing adb command: {stderr.decode('utf-8')}")
    return stdout.decode('utf-8')


def get_driver():
    desired_caps = {
        "platformName": "Android",
        "deviceName": "emulator-5554",
        "appPackage": "com.reactnative_performance",
        "appActivity": ".MainActivity",
        "automationName": "UiAutomator2",
        "noReset": True,
        "newCommandTimeout": 180
    }
    driver = webdriver.Remote('http://localhost:4723/wd/hub', desired_caps)
    # driver.wait_activity(".MainActivity", timeout=90)
    return driver


def write_metrics_to_csv(metrics_data, filename, fieldnames):
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for metric in metrics_data:
            writer.writerow(metric)


def close_page(driver):
    driver.press_keycode(4)


def scroll_down(driver):
    window_size = driver.get_window_size()
    start_x = window_size['width'] // 2
    start_y = int(window_size['height'] * 0.8)
    end_y = int(window_size['height'] * 0.2)
    duration = 800  # Adjust the duration to control the speed (in milliseconds)
    driver.swipe(start_x, start_y, start_x, end_y, duration)


def get_memory_info(app_package):
    command = f"adb shell dumpsys meminfo {app_package}"
    output = get_adb_output(command)

    total = None
    native_heap = None
    dalvik_heap = None

    for line in output.split("\n"):
        if "Native Heap" in line:
            native_heap = int(line.split()[2])
        elif "Dalvik Heap" in line:
            dalvik_heap = int(line.split()[2])
        elif "TOTAL" in line:
            for word in line.split():
                if word.isdigit():
                    total = int(word)
                    break

    return total, native_heap, dalvik_heap
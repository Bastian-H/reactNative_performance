#this is test_list_page.py

import time
from datetime import datetime
from appium.webdriver.common.mobileby import MobileBy
from multiprocessing import Process, Manager
from utils import (
    get_driver,
    write_metrics_to_csv,
    close_page,
    scroll_down,
    get_memory_info,
)

def measure_metrics(metrics_data, app_package, page, end_time, measurement_interval, done):
    next_measurement_time = time.time()

    while not done.value:
        start_time = time.time()

        if time.time() >= next_measurement_time:
            total, native_heap, dalvik_heap = get_memory_info(app_package)
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S.%f")[:-4]

            metrics_data.append({
                'page': page,
                'timestamp': timestamp,
                'total': total,
                'native_heap': native_heap,
                'dalvik_heap': dalvik_heap,
            })

            next_measurement_time = start_time + measurement_interval


def test_main_flow():
    runs = 10  # Number of runs
    all_run_metrics = []  # List to store metrics for all runs

    for _ in range(runs):
        driver = get_driver()

        manager = Manager()
        metrics_data = manager.list()
        done = manager.Value('b', False)

        page = "List Page"
        time.sleep(3)
        driver.find_element(MobileBy.ACCESSIBILITY_ID, page).click()

        start_time = time.time()
        end_time = start_time + 10  # Set the end time for the 10-second duration
        measurement_interval = 0.5  # Measurement interval in seconds

        p = Process(target=measure_metrics, args=(metrics_data, "com.reactnative_performance", page, end_time, measurement_interval, done))
        p.start()

        while time.time() < end_time:
            scroll_down(driver)
            time.sleep(measurement_interval)

        done.value = True
        p.join()

        close_page(driver)
        time.sleep(2)

        # Convert the shared list to a normal list after the process is joined
        all_run_metrics.append(list(metrics_data))

        driver.quit()

    # Calculate averages for each measurement
    # Calculate averages for each measurement
    averages = []
    min_len = min(len(run) for run in all_run_metrics)  # Get the minimum length of any run

    for i in range(min_len):
        total = 0
        native_heap = 0
        dalvik_heap = 0
        count = 0

        for run_metrics in all_run_metrics:
            if i < len(run_metrics):  # Check if index i exists in this run
                total += run_metrics[i]['total']
                native_heap += run_metrics[i]['native_heap']
                dalvik_heap += run_metrics[i]['dalvik_heap']
                count += 1

        if count > 0:  # Avoid division by zero
            averages.append({
                'page': all_run_metrics[0][i]['page'],
                'timestamp': all_run_metrics[0][i]['timestamp'],
                'total': total / count,
                'native_heap': native_heap / count,
                'dalvik_heap': dalvik_heap / count,
            })


    fieldnames = ['page', 'timestamp', 'total', 'native_heap', 'dalvik_heap']
    write_metrics_to_csv(averages, 'list_page_ram_usage.csv', fieldnames)


if __name__ == "__main__":
    test_main_flow()
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
import time

# Selenium WebDriver 설정
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
# chrome_options.add_argument("--headless")  # 필요 시 주석 해제
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # 페이지 로드
    main_url = "https://id.kaist.ac.kr/research"
    print("Starting browser...")
    driver.get(main_url)

    # JavaScript 로드 상태 확인
    print("Waiting for page to load...")
    WebDriverWait(driver, 20).until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )
    print("Page loaded successfully!")

    # 추가 대기 시간 (필요할 경우)
    time.sleep(5)

    # 연구실 링크 목록 저장
    print("Extracting research items...")
    wait = WebDriverWait(driver, 20)
    research_items = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.LabList li")))
    print(f"Number of research items found: {len(research_items)}")

    lab_links = []
    for item in research_items:
        try:
            lab_link = item.find_element(By.TAG_NAME, "a").get_attribute("href")
            thumbnail = item.find_element(By.TAG_NAME, "img").get_attribute("src")
            lab_links.append({"link": lab_link, "thumbnail": thumbnail})
        except Exception as e:
            print(f"Error extracting lab link: {e}")
            continue

    research_data = {}
    for lab in lab_links:
        lab_link = lab["link"]
        thumbnail = lab["thumbnail"]
        try:
            print(f"Processing lab: {lab_link}")
            driver.get(lab_link)

            # 데이터 크롤링
            lab_title = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "LabTitle"))).text
            description = driver.find_element(By.CLASS_NAME, "description").text
            lab_pi = driver.find_element(By.CLASS_NAME, "LabPI").text
            email = driver.find_element(By.CLASS_NAME, "email").text
            lab_keywords = [keyword.text for keyword in driver.find_elements(By.CSS_SELECTOR, ".LabKeywords > ul > li")]
            lab_homepage = driver.find_element(By.CSS_SELECTOR, ".LabLink > a").get_attribute("href")

            research_data[lab_title] = {
                "lab_title": lab_title,
                "thumbnail": thumbnail,
                "description": description,
                "LabPI": lab_pi,
                "email": email,
                "LabKeywords": lab_keywords,
                "LabLink": lab_homepage
            }
            print(f"Data extracted for: {lab_title}")

        except (StaleElementReferenceException, TimeoutException) as e:
            print(f"Error extracting data for lab: {e}")
            continue

        # 메인 페이지 복귀
        driver.get(main_url)
        time.sleep(2)

    # JSON 파일 저장
    print("Saving data to research_data.json...")
    with open("./crawling/id_research_data.json", "w", encoding="utf-8") as f:
        json.dump(research_data, f, ensure_ascii=False, indent=4)
    print("Data saved successfully!")

finally:
    driver.quit()

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import json
import time

# Selenium WebDriver 설정
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

def safe_find_element(driver, by, value, default=""):
    """요소를 안전하게 찾고, 없을 경우 기본값 반환"""
    try:
        return driver.find_element(by, value).text.strip()
    except Exception:
        return default

def safe_find_attribute(driver, by, value, attribute, default=""):
    """요소의 속성을 안전하게 찾고, 없을 경우 기본값 반환"""
    try:
        return driver.find_element(by, value).get_attribute(attribute).strip()
    except Exception:
        return default

def safe_find_description(driver):
    """detailTXt 안의 모든 텍스트를 가져옵니다."""
    try:
        # detailTXt 요소 가져오기
        element = driver.find_element(By.CLASS_NAME, "detailTXt")
        # 텍스트를 추출하고 공백 제거
        text = element.text.strip()
        return text
    except Exception as e:
        print(f"설명 추출 중 오류 발생: {e}")
        return "No description."
    
def extract_image_from_upload_files(driver):
    """Extract a single image src URL containing 'upload_files' on the current page."""
    try:
        img_elements = driver.find_elements(By.TAG_NAME, "img")
        for img in img_elements:
            src = img.get_attribute("src")
            if "upload_files" in src:
                print(f"Found image in 'upload_files': {src}")
                return src  # 첫 번째 'upload_files' 이미지를 반환
        print("No 'upload_files' image found.")
        return None
    except Exception as e:
        print(f"Error extracting image: {e}")
        return None


try:
    # 페이지 로드
    main_url = "https://cs.kaist.ac.kr/research/labs"
    print("Starting browser...")
    driver.get(main_url)

    # 메인 페이지 로드 대기
    print("Waiting for main page to load...")
    WebDriverWait(driver, 20).until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )
    print("Main page loaded successfully!")

    # 연구실 링크 수집
    print("Collecting lab links...")
    lab_elements = WebDriverWait(driver, 20).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li.horiz_item > a"))
    )
    lab_links = [element.get_attribute("href") for element in lab_elements]
    print(f"Collected {len(lab_links)} lab links.")

    research_data = {}

    for link in lab_links:
        try:
            # 연구실 페이지 이동
            print(f"Accessing lab page: {link}")
            driver.get(link)

            # 페이지 로드 대기
            WebDriverWait(driver, 20).until(
                lambda d: d.execute_script("return document.readyState") == "complete"
            )
            time.sleep(1)  # 추가 대기 시간

            # 연구실 데이터 수집
            lab_title = safe_find_element(driver, By.CSS_SELECTOR, "h3")

            # Thumbnail 안전하게 가져오기
            thumbnail = extract_image_from_upload_files(driver)

            # Description 안전하게 가져오기 (기본값 처리)
            description = safe_find_description(driver)

            lab_pi = safe_find_element(driver, By.XPATH, "//dt[contains(text(), '교수명')]/following-sibling::dd")
            email_raw = safe_find_element(driver, By.XPATH, "//dt[contains(text(), '이메일')]/following-sibling::dd/a")
            email = email_raw.replace(" (at) ", "@").strip() if email_raw else ""
            lab_keywords_raw = safe_find_element(driver, By.XPATH, "//dt[contains(text(), '연구분야')]/following-sibling::dd")
            lab_keywords = [kw.strip() for kw in lab_keywords_raw.split(",")] if lab_keywords_raw else []
            lab_homepage = safe_find_attribute(driver, By.XPATH, "//dt[contains(text(), '웹사이트')]/following-sibling::dd/a", "href")

            # 데이터 저장
            research_data[lab_title] = {
                "lab_title": lab_title,
                "thumbnail": thumbnail,
                "description": description,
                "LabPI": lab_pi,
                "email": email,
                "LabKeywords": lab_keywords,
                "LabLink": lab_homepage,
            }
            print(f"Data extracted for: {lab_title}")

        except Exception as e:
            print(f"Error extracting data for lab at {link}: {e}")
            continue

    # JSON 파일 저장
    print("Saving data to research_data.json...")
    with open("./crawling/cs_research_data.json", "w", encoding="utf-8") as f:
        json.dump(research_data, f, ensure_ascii=False, indent=4)
    print("Data saved successfully!")

finally:
    driver.quit()

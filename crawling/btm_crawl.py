import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager

# Selenium WebDriver 설정
chrome_options = Options()
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

def get_element_text_safe(driver, parent, selector, timeout=3, default="No Data"):
    """지정한 시간 동안 요소의 텍스트를 안전하게 가져옵니다."""
    try:
        elem = WebDriverWait(parent, timeout).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, selector))
        )
        return elem.text.strip() if elem.text.strip() else default
    except TimeoutException:
        return default

def get_element_attribute_safe(driver, parent, selector, attribute, timeout=3, default="No Data"):
    """지정한 시간 동안 요소의 속성 값을 안전하게 가져옵니다."""
    try:
        elem = WebDriverWait(parent, timeout).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, selector))
        )
        return elem.get_attribute(attribute) if elem.get_attribute(attribute) else default
    except TimeoutException:
        return default

try:
    # 메인 URL 로드
    main_url = "https://btm.kaist.ac.kr/page/ko/selectPage.do?menuSeq=3254&pageSeq=3370"
    driver.get(main_url)
    WebDriverWait(driver, 20).until(
        lambda d: d.execute_script("return document.readyState") == "complete"
    )

    research_data = []
    # 각 랩실 항목 가져오기
    lab_items = WebDriverWait(driver, 20).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, "ul.accordion-list > li"))
    )

    for lab_item in lab_items:
        try:
            lab_item.click()  # 랩실 아이템 클릭 (확장)

            # `l-con`이 로드될 때까지 기다림
            WebDriverWait(driver, 10).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, "div.l-con"))
            )

            # 데이터 추출
            name = get_element_text_safe(driver, lab_item, ".title", timeout=3)
            major = "BTM"
            thumbnail = get_element_attribute_safe(driver, lab_item, "figure.r-con img.img-con", "src", timeout=3, default="No Image")
            description = get_element_text_safe(driver, lab_item, "p.info.txt", timeout=3)
            lab_pi = get_element_text_safe(driver, lab_item, "span.info.name", timeout=3)
            email = get_element_text_safe(driver, lab_item, "a.info.mail", timeout=3)
            lab_keywords = get_element_text_safe(driver, lab_item, "span.info.keyword", timeout=3).split(" ")
            lab_link = get_element_attribute_safe(driver, lab_item, "a.info.link", "href", timeout=3, default="No Data")

            # 데이터 저장
            research_data_lab = {
                "name": name,
                "major": major,
                "thumbnail": thumbnail,
                "description": description,
                "LabPI": lab_pi,
                "email": email,
                "LabKeywords": lab_keywords,
                "LabLink": lab_link,
            }
            research_data.append(research_data_lab)

        except TimeoutException as e:
            print(f"Timeout while processing lab item: {e}")
        except NoSuchElementException as e:
            print(f"Missing element in lab item: {e}")

    # JSON 파일 저장
    with open("./crawling/btm_research_data.json", "w", encoding="utf-8") as f:
        json.dump(research_data, f, ensure_ascii=False, indent=4)

finally:
    driver.quit()

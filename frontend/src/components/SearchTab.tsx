import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";

const departments = [
  { label: "CS", value: "CS" },
  { label: "ID", value: "ID" },
  { label: "BTM", value: "BTM" }
];

const recruitmentTypes = ["개별 연구", "랩 인턴", "졸업 연구"];

interface SearchTabProps {
  showDepartments?: boolean;
  showRecruitment?: boolean;
  onSearch: (query: string) => void; // 검색어 처리 콜백
  onFilterChange: (filters: {
    departments: string[]; // 선택된 학과
    recruitment: string[]; // 선택된 모집 여부
  }) => void;
  onMajorFilter?: (major: string | null) => void; // 선택된 학과를 별도로 처리
  onRecruitFilter?: (recruit: boolean | null) => void; // 모집 여부를 별도로 처리
}

const SearchTab: React.FC<SearchTabProps> = ({
  showDepartments = true,
  showRecruitment = true,
  onSearch,
  onFilterChange,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRecruitment, setSelectedRecruitment] = useState<string[]>([]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((d) => d !== department)
        : [...prev, department]
    );
  };

  const handleRecruitmentChange = (recruitment: string) => {
    setSelectedRecruitment((prev) =>
      prev.includes(recruitment)
        ? prev.filter((r) => r !== recruitment)
        : [...prev, recruitment]
    );
  };

  const handleSearch = () => {
    onSearch(searchQuery); // 부모 컴포넌트에 검색어 전달
    onFilterChange({
      departments: selectedDepartments,
      recruitment: selectedRecruitment,
    }); // 필터링 정보 전달
  };

  return (
    <Wrapper>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="이름을 입력해주세요."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch(searchQuery); // 검색 실행
              onFilterChange({
                departments: selectedDepartments,
                recruitment: selectedRecruitment,
              }); // 필터 정보 전달
            }
          }}
        />
        <SearchButton onClick={handleSearch}>
          <FaSearch />
        </SearchButton>
        <CollapseButton onClick={toggleCollapse}>
          {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
        </CollapseButton>
      </SearchBar>
      {!isCollapsed && (
        <FilterWrapper>
          {showDepartments && (
            <FilterSection>
              <FilterTitle>학과</FilterTitle>
              <FilterContent>
                {departments.map((dept) => (
                  <CheckboxWrapper key={dept.value}>
                    <input
                      type="checkbox"
                      checked={selectedDepartments.includes(dept.value)}
                      onChange={() => handleDepartmentChange(dept.value)}
                    />
                    <CheckboxLabel>{dept.label}</CheckboxLabel>
                  </CheckboxWrapper>
                ))}
              </FilterContent>
            </FilterSection>
          )}
          {showRecruitment && (
            <FilterSection>
              <FilterTitle>모집 여부</FilterTitle>
              <FilterContent>
                {recruitmentTypes.map((type) => (
                  <CheckboxWrapper key={type}>
                    <input
                      type="checkbox"
                      checked={selectedRecruitment.includes(type)}
                      onChange={() => handleRecruitmentChange(type)}
                    />
                    <CheckboxLabel>{type}</CheckboxLabel>
                  </CheckboxWrapper>
                ))}
              </FilterContent>
            </FilterSection>
          )}
        </FilterWrapper>
      )}
    </Wrapper>
  );
};

export default SearchTab;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px 10px 10px;
  border-radius: 8px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  align-items: center;
  font-family: pretendard;
  padding-bottom: 6px;
  font-size: ${({ theme }) => theme.typography.T5.fontSize};
  font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
  color: ${({ theme }) => theme.colors.black};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;

const SearchButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.black};
`;

const CollapseButton = styled(SearchButton)``;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  padding: 4px;
`;

const FilterTitle = styled.div`
  font-family: pretendard;
  font-size: ${({ theme }) => theme.typography.T5.fontSize};
  font-weight: ${({ theme }) => theme.typography.T5.fontWeight};
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 16px;
`;

const FilterContent = styled.div`
  font-family: pretendard;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CheckboxLabel = styled.label`
  font-family: pretendard;
  font-size: ${({ theme }) => theme.typography.T6.fontSize};
  font-weight: ${({ theme }) => theme.typography.T6.fontWeight};
  color: ${({ theme }) => theme.colors.black};
`;

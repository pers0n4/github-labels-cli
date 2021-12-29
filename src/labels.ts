import * as palette from "./palette";

export const defaultLabels = [
  {
    name: "Priority: Critical",
    color: palette.red.A700,
    description: "우선순위: 긴급",
  },
  {
    name: "Priority: High",
    color: palette.orange.A700,
    description: "우선순위: 높음",
  },
  {
    name: "Priority: Low",
    color: palette.lightGreen.A700,
    description: "우선순위: 낮음",
  },
  {
    name: "Priority: Medium",
    color: palette.yellow.A700,
    description: "우선순위: 중간",
  },
  {
    name: "Status: Available",
    color: palette.green[100],
    description: "상태: 작업을 시작할 수 있는 Issue 또는 PR",
  },
  {
    name: "Status: In Progress",
    color: palette.teal[100],
    description: "상태: 작업 중인 Issue 또는 PR",
  },
  {
    name: "Status: On Hold",
    color: palette.pink[100],
    description: "상태: 먼저 처리해야 하는 작업이 있는 Issue 또는 PR",
  },
  {
    name: "Status: Pending",
    color: palette.amber[100],
    description: "상태: 작업 대기 중인 Issue 또는 PR",
  },
  {
    name: "Status: Review Needed",
    color: palette.lime[100],
    description: "상태: 검증이 필요한 Issue 또는 PR",
  },
  {
    name: "Type: Bug",
    color: palette.deepOrange[400],
    description: "분류: 버그",
  },
  {
    name: "Type: Documentation",
    color: palette.lightBlue[400],
    description: "분류: 문서",
  },
  {
    name: "Type: Feature",
    color: palette.blue[400],
    description: "분류: 기능 추가",
  },
  {
    name: "Type: Improvement",
    color: palette.indigo[400],
    description: "분류: 기능 개선",
  },
  {
    name: "Type: Question",
    color: palette.purple[400],
    description: "분류: 질문",
  },
  {
    name: "Type: Refactor",
    color: palette.deepPurple[400],
    description: "분류: 리팩터링",
  },
  {
    name: "Type: Test",
    color: palette.cyan[400],
    description: "분류: 테스팅",
  },
];

<div align="center">

[![CI](https://github.com/Wchoi189/upstageailab-ocr-recsys-competition-ocr-2/actions/workflows/ci.yml/badge.svg)](https://github.com/Wchoi189/upstageailab-ocr-recsys-competition-ocr-2/actions)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.8+-red.svg)](https://pytorch.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Hugging Face Model](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Model-FFD21E.svg)](https://huggingface.co/wchoi189/receipt-text-detection_kr-pan_resnet18)

# OCR 텍스트 인식 및 레이아웃 분석 시스템

**레이아웃 분석을 통한 정확한 정보 추출을 위한 AI 최적화 텍스트 인식 시스템**

[English](README.md) • [한국어](README.ko.md)

[기능](#features) • [진행 현황](#project-progress) • [문서화](#documentation)

</div>

---

## 소개

이 프로젝트는 Upstage AI 부트캠프 OCR 경진대회에서 시작되어 개인적으로 발전시킨 엔드투엔드 텍스트 인식 시스템입니다. 고급 레이아웃 분석 기능을 갖추고 있으며, 현재 주요 아키텍처 업그레이드 전 최종 안전 점검을 진행 중입니다.

**저장소:**
- **개인 (지속 개발):** [Wchoi189/upstageailab-ocr-recsys-competition-ocr-2](https://github.com/Wchoi189/upstageailab-ocr-recsys-competition-ocr-2)
- **원본 (부트캠프):** [AIBootcamp13/upstageailab-ocr-recsys-competition-ocr-2](https://github.com/AIBootcamp13/upstageailab-ocr-recsys-competition-ocr-2)

---

## 주요 기능

- **원근 보정**: Rembg의 이진 마스크 출력을 활용한 고신뢰도 엣지 감지
- **기하학적 변환**: 대상 영역의 가시성을 최적화하는 기하학적 변환 적용
- **배경 정규화**: 고품질 이미지에서 조명 변화 및 색상 편향으로 인한 감지 실패 해결
- **이미지 분석**: 자동화된 이미지 평가 및 기술적 결함 보고를 위한 전용 VLM 도구

---
## OCR 추론 콘솔

OCR 추론 콘솔은 OCR 웹 서비스를 위한 개념 검증용 프론트엔드로, 문서 미리보기 및 구조화된 출력 분석을 위한 간소화된 인터페이스를 제공합니다.

<div align="center">
  <a href="docs/assets/images/demo/my-app.webp">
    <img src="docs/assets/images/demo/my-app.webp" alt="OCR 추론 콘솔" width="800px" />
  </a>
  <p><em>OCR 추론 콘솔: 문서 미리보기, 레이아웃 분석, 구조화된 JSON 출력을 지원하는 3-패널 레이아웃 (확대하려면 클릭)</em></p>
</div>

### UX 디자인 출처
사용자 인터페이스 디자인은 **Upstage Document OCR 콘솔**에서 영감을 받았습니다. 문서 미리보기와 구조화된 출력을 포함한 3-패널 콘솔 레이아웃은 Upstage 제품군의 상호작용 모델을 따릅니다.

이 저장소의 모든 코드 구현은 Upstage# OCR & RecSys Competition - OCR Track을 기반으로 합니다.

> **AI 에이전트 시작 가이드**: [`AGENTS.md`](./AGENTS.md)
주요 기여 내용으로는 현대적인 설정 구성, 성능 개선, 개발 워크플로우 강화가 포함됩니다.

원본: https://console.upstage.ai/playground/document-ocr

---
## 실험 트래커: 체계적인 AI 주도 연구

**해결 과제**: 빠른 AI 주도 실험은 종종 대량의 산출물, 스크립트, 문서를 생성하며 체계적인 조직이 필요합니다. 전통적인 프로젝트 구조는 일일 반복 실험과 즉각적인 디버깅 요구 사항에 부적합합니다.

**해결 방안**: `experiment-tracker/` - 인간 가독성과 AI 소비를 동시에 최적화한 실험 산출물 조직 시스템. 일반적인 워크플로우와 산출물 형식에 대한 표준화된 프로토콜 제공.

### 표준화된 기술 보고서 예시

**기준선 분석**
- [기준선 지표 요약](experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/artifacts/20251218_1415_report_baseline-metrics-summary.md) - 품질 개선 사항 비교를 위한 종합적 기준 지표 확립

**사고 해결**
- [데이터 손실 사고 보고서](experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/artifacts/20251220_0130_incident_report_perspective_correction_data_loss.md) - 중대 데이터 손실 사고 분석 및 해결 전략

**비교 분석**
- [배경 정규화 비교](experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/.metadata/reports/20251218_1458_report_background-normalization-comparison.md) - 정량적 결과를 포함한 배경 정규화 전략 비교

### 시각적 결과 및 데모

<div align="center">

| 맞춤 코너 | 보정 결과 |
| :---: | :---: |
| [<img src="docs/assets/images/demo/original-with-fitted-corners.webp" width="700px" />](docs/assets/images/demo/original-with-fitted-corners.webp) | [<img src="experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/outputs/full_pipeline_correct/drp.en_ko.in_house.selectstar_000712_step2_corrected.jpg" width="250px" />](experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/outputs/full_pipeline_correct/drp.en_ko.in_house.selectstar_000712_step2_corrected.jpg) |
| *코너 감지 및 기하학적 맞춤* | *최종 원근 보정 결과* |

*(확대하려면 이미지 클릭)*

</div>

### 주요 장점

- **AI 최적화**: 효율적인 AI 소비를 위해 설계된 문서 구조
- **표준화 프로토콜**: 수동 프롬프팅 감소 및 고품질 결과 생성
- **추적 가능성**: 모든 실험 결과에 대한 완전한 재현 경로
- **확장성**: 실험 산출물 격리를 통한 컨텍스트 혼란 방지

---
## 저해상도 예측 문제

<div align="center">

| 이전: 지속적 저예측 | 내부 프로세스 | 이후: 성공적 감지 |
| :---: | :---: | :---: |
| [<img src="docs/assets/images/demo/inference-persistent-empties-before.webp" width="250px" />](docs/assets/images/demo/inference-persistent-empties-before.webp) | [<img src="docs/assets/images/demo/inference-persistent-empties-after.webp" width="250px" />](docs/assets/images/demo/inference-persistent-empties-after.webp) | [<img src="docs/assets/images/demo/inference-persistent-empties-after2.webp" width="250px" />](docs/assets/images/demo/inference-persistent-empties-after2.webp) |
| *빈 패치* | *필터 적용* | *정규화된 기하구조* |

*(확대하려면 이미지 클릭)*

</div>

---
## 프로젝트 진행 현황

<div align="center">

| 단계 | 상태 | 진행률 |
|-------|--------|----------|
| **1-4단계: 핵심 개발** | 완료 | 100% |
| **5단계: 업그레이드 준비** | 진행 중 | 80% |
| **6단계: 아키텍처 업그레이드** | 예정 | 0% |

**전체 진행률: 80% 완료**

</div>

**현재 초점:** 최종 안전 점검, 시스템 검증 및 주요 아키텍처 개선 준비

---

## 기술 스택

| 분류 | 기술 |
|----------|-------------|
| **ML/DL** | PyTorch, PyTorch Lightning, Hydra |
| **백엔드** | FastAPI, ONNX Runtime |
| **프론트엔드** | React 19, Next.js 16, Chakra UI, Streamlit |
| **도구** | UV (Python), npm, W&B, Playwright, Vitest |

---

## 모델 목록

| 모델 이름 | 아키텍처 | H-Mean | Hugging Face |
|------------|--------------|--------|--------------|
| **영수증 감지 KR** | DBNet + PAN (ResNet18) | 95.37% | [🤗 모델 카드](https://huggingface.co/wchoi189/receipt-text-detection_kr-pan_resnet18) |

---

## 문서화

**AI 지향 리소스 (.ai-instructions)**
- [시스템 아키텍처](.ai-instructions/tier1-sst/system-architecture.yaml)
- [API 계약](.ai-instructions/tier2-framework/api-contracts.yaml)
- [AgentQMS 워크플로우](AgentQMS/knowledge/agent/system.md)

**참조 문서**
- [파일 배치 규칙](.ai-instructions/tier1-sst/file-placement-rules.yaml)
- [변경 로그](CHANGELOG.md)

---

## 프로젝트 구조

```
├── AgentQMS/          # AI 문서화 및 품질 관리
├── apps/              # 프론트엔드 & 백엔드 애플리케이션
├── configs/           # Hydra 설정 파일 (89개 YAML 파일)
├── docs/              # AI 최적화 문서 및 산출물
├── ocr/               # 핵심 OCR Python 패키지
├── runners/           # 학습/테스트/예측 스크립트
├── scripts/           # 유틸리티 스크립트
├── tests/             # 단위 및 통합 테스트
```

상세 구조: [.ai-instructions/tier1-sst/file-placement-rules.yaml](.ai-instructions/tier1-sst/file-placement-rules.yaml)

---

## 기여 안내

기여를 환영합니다! 가이드라인은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.

---

## 라이선스

MIT 라이선스 - 자세한 내용은 [LICENSE](LICENSE)를 참조하세요.

---

<div align="center">

[⬆ 맨 위로 이동](#ocr-텍스트-인식-및-레이아웃-분석-시스템)

</div>
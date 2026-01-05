<div align="center">

[![CI](https://github.com/Wchoi189/upstageailab-ocr-recsys-competition-ocr-2/actions/workflows/ci.yml/badge.svg)](https://github.com/Wchoi189/upstageailab-ocr-recsys-competition-ocr-2/actions)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.8+-red.svg)](https://pytorch.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Hugging Face Model](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-Model-FFD21E.svg)](https://huggingface.co/wchoi189/receipt-text-detection_kr-pan_resnet18)

# OCR 텍스트 인식 및 레이아웃 분석 시스템

**레이아웃 분석을 통한 정확한 정보 추출을 위한 AI 최적화 텍스트 인식 시스템**

[English](README.md) • [한국어](README.ko.md)

[기능](#features) • [진행 상황](#project-progress) • [문서](#documentation)

</div>

---

## 소개

이 프로젝트는 Upstage AI 부트캠프 OCR 경연에서 시작되었으며, 고급 레이아웃 분석을 갖춘 엔드투엔드 텍스트 인식 시스템 구축을 위한 개인 프로젝트로 발전했습니다. 현재 주요 아키텍처 업그레이드 전 최종 준비 및 안전 점검을 진행 중입니다.

**저장소:**
- **개인 (지속 개발):** [Wchoi189/upstageailab-ocr-recsys-competition-ocr-2](https://github.com/Wchoi189/upstageailab-ocr-recsys-competition-ocr-2)
- **원본 (부트캠프):** [AIBootcamp13/upstageailab-ocr-recsys-competition-ocr-2](https://github.com/AIBootcamp13/upstageailab-ocr-recsys-competition-ocr-2)

---

## 기능

- **원근 보정**: Rembg의 이진 마스크 출력을 활용한 고신뢰도 에지 감지
- **원근 변환**: 대상 영역의 가시성 최적화를 위한 기하학적 변환
- **배경 정규화**: 고품질 이미지에서의 조명 변동 및 색조 편향으로 인한 감지 실패 해결
- **이미지 분석**: 자동화된 이미지 평가 및 기술적 결함 보고를 위한 특수 VLM 도구

---
## OCR 추론 콘솔

OCR 추론 콘솔은 OCR 웹 서비스를 위한 개념 증명 프론트엔드입니다. 문서 미리보기 및 구조화된 출력 분석을 위한 간소화된 인터페이스를 제공합니다.

<div align="center">
  <a href="docs/assets/images/demo/my-app.webp">
    <img src="docs/assets/images/demo/my-app.webp" alt="OCR 추론 콘솔" width="800px" />
  </a>
  <p><em>OCR 추론 콘솔: 문서 미리보기, 레이아웃 분석, 구조화된 JSON 출력을 갖춘 3패널 레이아웃. (클릭하여 확대)</em></p>
</div>

### UX 출처
사용자 인터페이스 디자인은 **Upstage 문서 OCR 콘솔**에서 영감을 받았습니다. 문서 미리보기 및 구조화된 출력을 포함한 3패널 콘솔의 레이아웃 패턴은 Upstage 제품군에서 확립된 상호작용 모델을 따릅니다.

이 저장소의 모든 코드 및 구현은 Upstage# OCR & RecSys Competition - OCR Track을 기반으로 합니다.

> **AI 에이전트 시작 지점**: [`AGENTS.md`](./AGENTS.md)
> 주요 기여 사항: 구성 현대화, 성능 개선, 개발 워크플로우 향상

원본: https://console.upstage.ai/playground/document-ocr

---
## 실험 추적기: 체계적인 AI 기반 연구

**해결 문제**: 빠른 AI 기반 실험은 대량의 아티팩트, 스크립트, 문서를 생성하며, 체계적인 정리가 필요합니다. 기존 프로젝트 구조는 실험이 매일 반복되고 디버깅 시 신뢰할 수 있는 문서에 즉시 접근해야 할 때 실패합니다.

**해결책**: `experiment-tracker/` - 인간의 가독성과 AI 소비를 모두 최적화한 실험 아티팩트 체계화 시스템. 일반적인 워크플로우와 아티팩트 출력 형식에 대한 표준화된 프로토콜 제공.

### 표준화된 기술 보고서 및 문서 예시

**기준선 분석**
- [기준선 메트릭 요약](experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/artifacts/20251218_1415_report_baseline-metrics-summary.md) - 품질 미세 개선 시 성능 기준선 설정

**사고 해결**
- [데이터 손실 사고 보고서](experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/artifacts/20251220_0130_incident_report_perspective_correction_data_loss.md) - 중요한 데이터 손실 사고 분석 및 해결 전략

**비교 분석**
- [배경 정규화 비교](experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/.metadata/reports/20251218_1458_report_background-normalization-comparison.md) - 정량적 결과를 포함한 배경 정규화 전략 비교

### 시각적 결과 및 데모

<div align="center">

| 적합 코너 | 보정된 출력 |
| :---: | :---: |
| [<img src="docs/assets/images/demo/original-with-fitted-corners.webp" width="700px" />](docs/assets/images/demo/original-with-fitted-corners.webp) | [<img src="experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/outputs/full_pipeline_correct/drp.en_ko.in_house.selectstar_000712_step2_corrected.jpg" width="250px" />](experiment-tracker/experiments/20251217_024343_image_enhancements_implementation/outputs/full_pipeline_correct/drp.en_ko.in_house.selectstar_000712_step2_corrected.jpg) |
| *코너 감지 및 기하학적 적합* | *최종 원근 보정 출력* |

*(이미지 클릭 시 확대)*

</div>

### 주요 이점

- **AI 최적화**: 효율적인 AI 소비를 위한 문서 구조 설계
- **표준화된 프로토콜**: 수동 프롬프트 감소 및 고품질 결과 생성
- **추적 가능성**: 모든 실험 결과에 대한 완전한 재현 경로
- **확장 가능한 조직**: 컨텍스트 혼란을 방지하기 위한 격리된 실험 아티팩트

---
## 낮은 예측 해상도

<div align="center">

| 이전: 지속적인 낮은 예측 | 내부 프로세스 | 이후: 성공적인 감지 |
| :---: | :---: | :---: |
| [<img src="docs/assets/images/demo/inference-persistent-empties-before.webp" width="250px" />](docs/assets/images/demo/inference-persistent-empties-before.webp) | [<img src="docs/assets/images/demo/inference-persistent-empties-after.webp" width="250px" />](docs/assets/images/demo/inference-persistent-empties-after.webp) | [<img src="docs/assets/images/demo/inference-persistent-empties-after2.webp" width="250px" />](docs/assets/images/demo/inference-persistent-empties-after2.webp) |
| *빈 패치* | *필터 적용* | *정규화된 기하학* |

*(이미지 클릭 시 확대)*

</div>

---
## 프로젝트 진행 상황

<div align="center">

| 단계 | 상태 | 진행률 |
|-------|--------|----------|
| **1-4단계: 핵심 개발** | 완료 | 100% |
| **5단계: 업그레이드 준비** | 진행 중 | 80% |
| **6단계: 아키텍처 업그레이드** | 계획 중 | 0% |

**전체: 80% 완료**

</div>

**현재 집중 분야:** 최종 안전 점검, 시스템 검증, 주요 아키텍처 개선 준비

---

## 기술 스택

| 범주 | 기술 |
|----------|-------------|
| **ML/DL** | PyTorch, PyTorch Lightning, Hydra |
| **백엔드** | FastAPI, ONNX Runtime |
| **프론트엔드** | React 19, Next.js 16, Chakra UI, Streamlit |
| **도구** | UV (Python), npm, W&B, Playwright, Vitest |

---

## 모델 저장소

| 모델 이름 | 아키텍처 | H-Mean | Hugging Face |
|------------|--------------|--------|--------------|
| **영수증 감지 KR** | DBNet + PAN (ResNet18) | 95.37% | [🤗 모델 카드](https://huggingface.co/wchoi189/receipt-text-detection_kr-pan_resnet18) |

---

## 문서

**AI 대상 리소스 (.ai-instructions)**
- [시스템 아키텍처](.ai-instructions/tier1-sst/system-architecture.yaml)
- [API 계약](.ai-instructions/tier2-framework/api-contracts.yaml)
- [AgentQMS 워크플로우](AgentQMS/knowledge/agent/system.md)

**참고 자료**
- [파일 배치 규칙](.ai-instructions/tier1-sst/file-placement-rules.yaml)
- [변경 로그](CHANGELOG.md)

---

## 프로젝트 구조

```
├── AgentQMS/          # AI 문서 및 품질 관리
├── apps/              # 프론트엔드 및 백엔드 애플리케이션
├── configs/           # Hydra 구성 (89개의 YAML 파일)
├── docs/              # AI 최적화 문서 및 아티팩트
├── ocr/               # 핵심 OCR Python 패키지
├── runners/           # 학습/테스트/예측 스크립트
├── scripts/           # 유틸리티 스크립트
├── tests/             # 단위 및 통합 테스트
```

상세 구조: [.ai-instructions/tier1-sst/file-placement-rules.yaml](.ai-instructions/tier1-sst/file-placement-rules.yaml)

---

## 기여

기여를 환영합니다! 지침은 [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.

---

## 라이선스

MIT 라이선스 - 자세한 내용은 [LICENSE](LICENSE)를 참조하세요.

---

<div align="center">

[⬆ 맨 위로](#ocr-text-recognition--layout-analysis-system)

</div>
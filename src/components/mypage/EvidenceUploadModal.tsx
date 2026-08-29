import { useRef, useState } from 'react'
import { Eye, FileText, ImageOff, Search, UploadCloud, X } from 'lucide-react'
import Modal from '../ui/Modal'

export default function EvidenceUploadModal({
  open,
  onClose,
  title,
  exampleImage,
  description,
  onConfirm,
}: {
  open: boolean
  onClose: () => void
  title: string
  exampleImage?: string
  description: string
  onConfirm: (fileName: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState('')
  const [zoomOpen, setZoomOpen] = useState(false)

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0]
    if (file) setFileName(file.name)
  }

  const handleClose = () => {
    setFileName('')
    setZoomOpen(false)
    onClose()
  }

  const handleConfirm = () => {
    if (!fileName) return
    onConfirm(fileName)
    setFileName('')
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} maxWidthClassName="max-w-[860px]">
      <h3 className="text-[16px] font-bold text-ink-900">{title} 증빙자료 첨부</h3>

      <div className="mt-4 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        {exampleImage ? (
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="group relative block w-full cursor-zoom-in"
          >
            <img src={exampleImage} alt={`${title} 예시`} className="w-full object-contain" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/25 group-hover:opacity-100">
              <span className="flex items-center gap-1.5 rounded-lg bg-black/70 px-3 py-1.5 text-[12.5px] font-semibold text-white">
                <Search className="h-3.5 w-3.5" />
                크게 보기
              </span>
            </span>
          </button>
        ) : (
          <div className="flex h-56 flex-col items-center justify-center gap-2 text-gray-300">
            <ImageOff className="h-9 w-9" />
            <span className="text-[13px] font-medium">예시 이미지 준비 중</span>
          </div>
        )}
      </div>
      <p className="mt-2.5 text-[13px] leading-relaxed text-gray-500">{description}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-amber-600">
        <Eye className="h-3.5 w-3.5 shrink-0" />
        본인 이름이 잘 보이게 캡처하거나 촬영해서 첨부해주세요.
      </p>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-white px-4 py-8 text-center transition-colors hover:border-blue-400 hover:bg-blue-50/40"
      >
        <UploadCloud className="h-7 w-7 text-blue-500" />
        <span className="text-[13px] font-semibold text-ink-900">클릭해서 파일 선택하기</span>
        <span className="text-[11.5px] text-gray-400">이미지, PDF 파일을 첨부할 수 있어요.</span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {fileName && (
        <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-blue-50 px-3 py-2.5">
          <span className="flex min-w-0 items-center gap-1.5 text-[12.5px] font-medium text-blue-700">
            <FileText className="h-4 w-4 shrink-0" />
            <span className="truncate">{fileName}</span>
          </span>
          <button
            type="button"
            onClick={() => setFileName('')}
            aria-label="선택 취소"
            className="shrink-0 text-blue-400 hover:text-blue-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <button
        type="button"
        disabled={!fileName}
        onClick={handleConfirm}
        className="mt-5 w-full rounded-xl bg-blue-600 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        첨부하기
      </button>

      {zoomOpen && exampleImage && (
        <div
          className="fixed inset-0 z-110 flex items-center justify-center bg-black/85 p-6"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            aria-label="닫기"
            className="absolute right-6 top-6 text-white/80 hover:text-white"
          >
            <X className="h-7 w-7" />
          </button>
          <img
            src={exampleImage}
            alt={`${title} 예시 크게 보기`}
            className="max-h-[90vh] max-w-[95vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Modal>
  )
}

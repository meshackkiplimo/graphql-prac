import { StepProps } from '../SteppedForm'
import { TextareaAutosize } from '@mui/material'
import Box from '@component/Box'
import FlexBox from '@component/FlexBox'
import Typography from '@component/Typography'
import Select from '@component/Select'
import { Upload } from 'lucide-react'

const SelectField = ({ label, value, onChange, placeholder, options }: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  options: { value: string; label: string }[]
}) => (
  <Box>
    <Typography 
      variant="body2" 
      fontWeight="500" 
      color="#374151" 
      mb="0.5rem"
    >
      {label} <span style={{ color: '#dc2626' }}>*</span>
    </Typography>
    <Select
      value={options.find(option => option.value === value) || null}
      onChange={(selectedOption: any) => onChange(selectedOption?.value || '')}
      placeholder={placeholder}
      options={options}
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderColor: state.isFocused ? '#B82932' : provided.borderColor,
          boxShadow: state.isFocused ? '0 0 0 1px #B82932' : provided.boxShadow,
          '&:hover': {
            borderColor: state.isFocused ? '#B82932' : provided.borderColor,
          }
        })
      }}
    />
  </Box>
)

const TextAreaField = ({ label, value, onChange, placeholder }: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) => (
  <Box>
    <Typography 
      variant="body2" 
      fontWeight="500" 
      color="#374151" 
      mb="0.5rem"
    >
      {label} <span style={{ color: '#dc2626' }}>*</span>
    </Typography>
    <TextareaAutosize
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      minRows={6}
      style={{
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        fontSize: '0.875rem',
        backgroundColor: 'white',
        fontFamily: 'inherit',
        resize: 'vertical',
        outline: 'none',
      }}
      onFocus={(e) => {
        e.target.style.borderColor = '#9B1823'
        e.target.style.outline = '2px solid #9B1823'
        e.target.style.outlineOffset = '-1px'
      }}
      onBlur={(e) => {
        e.target.style.borderColor = '#d1d5db'
        e.target.style.outline = 'none'
      }}
    />
  </Box>
)

const FileUploadField = ({ label, description }: {
  label: string
  description: string
}) => (
  <Box>
    <Typography 
      variant="body2" 
      fontWeight="500" 
      color="#374151" 
      mb="0.5rem"
    >
      {label} <span style={{ color: '#6b7280', fontWeight: '400' }}>({description})</span>
    </Typography>
    <Box
      style={{
        border: '2px dashed #d1d5db',
        borderRadius: '0.375rem',
        padding: '3rem 1rem',
        textAlign: 'center',
        backgroundColor: '#f9fafb',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#9B1823'
        e.currentTarget.style.backgroundColor = '#fef2f2'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#d1d5db'
        e.currentTarget.style.backgroundColor = '#f9fafb'
      }}
    >
      <Upload size={48} color="#9ca3af" style={{ margin: '0 auto 1rem' }} />
      <Typography color="#9ca3af" fontSize="0.875rem">
        Click or drag file to this area to upload
      </Typography>
    </Box>
  </Box>
)

const enquiryTypeOptions = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'billing', label: 'Billing Question' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
]

const subjectOptions = [
  { value: 'product-info', label: 'Product Information' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'demo', label: 'Request Demo' },
  { value: 'support', label: 'Support Issue' },
  { value: 'feedback', label: 'Feedback' },
]

const EnquiryDetailsStep = ({ formData, updateFormData }: StepProps) => {
  return (
    <Box mb="1.5rem">
      <Typography 
        variant="h2" 
        fontSize="1.5rem" 
        fontWeight="600" 
        color="#111827" 
        mb="1.5rem"
      >
        Enquiry Details
      </Typography>
      
      <Box 
        display="grid" 
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        style={{ gap: '1.5rem', marginBottom: '1.5rem' }}
      >
        <SelectField
          label="Select Enquiry Type"
          value={formData.enquiryType || ''}
          onChange={(value) => updateFormData('enquiryType' as keyof typeof formData, value)}
          placeholder="Select"
          options={enquiryTypeOptions}
        />
        
        <SelectField
          label="Subject"
          value={formData.subject || ''}
          onChange={(value) => updateFormData('subject' as keyof typeof formData, value)}
          placeholder="Select"
          options={subjectOptions}
        />
      </Box>

      <Box mb="1.5rem">
        <TextAreaField
          label="Enquiry Message"
          value={formData.enquiryMessage || ''}
          onChange={(value) => updateFormData('enquiryMessage' as keyof typeof formData, value)}
          placeholder="Describe your enquiry in detail. Include relevant timelines, references, or context"
        />
      </Box>

      <FileUploadField
        label="Relevant Documents"
        description="PDF, DOCX, JPG, PNG. Max: 5MB"
      />
    </Box>
  )
}

export default EnquiryDetailsStep
import { FormData } from '../SteppedForm'
import Box from '@component/Box'
import FlexBox from '@component/FlexBox'
import Typography from '@component/Typography'
import { Edit, FileCheck } from 'lucide-react'

interface ReviewStepProps {
  formData: FormData
}

const ReviewCard = ({ title, onEdit, children }: {
  title: string
  onEdit?: () => void
  children: React.ReactNode
}) => (
  <Box
    style={{
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    }}
  >
    <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
      <Typography 
        variant="h3" 
        fontSize="1.125rem" 
        fontWeight="600" 
        color="#111827"
      >
        {title}
      </Typography>
      {onEdit && (
        <Box
          style={{ cursor: 'pointer', padding: '0.25rem' }}
          onClick={onEdit}
        >
          <Edit size={18} color="#6b7280" />
        </Box>
      )}
    </FlexBox>
    {children}
  </Box>
)

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Box 
    display="grid" 
    gridTemplateColumns="1.5fr 1fr" 
    alignItems="center" 
    mb="0.75rem"
    style={{ gap: '1rem' }}
  >
    <Typography color="#6b7280" fontSize="0.875rem">
      {label}:
    </Typography>
    <Typography color="#111827" fontSize="14px" fontWeight="400">
      {value || 'Not provided'}
    </Typography>
  </Box>
)

const DocumentItem = ({ fileName }: { fileName: string }) => (
  <FlexBox alignItems="center" style={{ gap: '0.5rem' }}>
    <FileCheck size={16} />
    <Typography color="#111827" fontSize="14px" fontWeight="400">
      {fileName}
    </Typography>
  </FlexBox>
)

const RadioOption = ({ checked, onChange, children, required = false }: {
  checked: boolean
  onChange: (checked: boolean) => void
  children: React.ReactNode
  required?: boolean
}) => (
  <FlexBox alignItems="flex-start" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
    <input
      type="radio"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      style={{
        marginTop: '0.125rem',
        accentColor: '#B82932',
        transform: 'scale(1.2)',
      }}
    />
    <Typography color="#6b7280" fontSize="0.875rem" style={{ lineHeight: '1.5' }}>
      {children}
      {required && <span style={{ color: '#dc2626' }}> *</span>}
    </Typography>
  </FlexBox>
)

const ReviewSubmitStep = ({ formData }: ReviewStepProps) => {
  const fullName = `${formData.firstName || ''} ${formData.otherNames || ''}`.trim()

  return (
    <Box mb="1.5rem">
      <Typography 
        variant="h2" 
        fontSize="1.5rem" 
        fontWeight="600" 
        color="#111827" 
        mb="1.5rem"
      >
        Review Your Information
      </Typography>
      
      <ReviewCard title="Basic Information" onEdit={() => {}}>
        <InfoRow label="Name" value={fullName} />
        <InfoRow label="Organisation Name" value={formData.organisationName} />
        <InfoRow label="Role/Title" value={formData.roleTitle} />
        <InfoRow label="Email Address" value={formData.emailAddress} />
        <InfoRow label="Phone Number" value={formData.phoneNumber} />
      </ReviewCard>

      <ReviewCard title="Enquiry Details" onEdit={() => {}}>
        <InfoRow label="Enquiry Type" value={formData.enquiryType} />
        <InfoRow label="Subject" value={formData.subject} />
        <Box 
          display="grid" 
          gridTemplateColumns="1.5fr 1fr" 
          alignItems="center" 
          mb="0.75rem"
          style={{ gap: '1rem' }}
        >
          <Typography color="#6b7280" fontSize="0.875rem">
            Enquiry Message:
          </Typography>
          <Typography color="#111827" fontSize="14px" fontWeight="400">
            {formData.enquiryMessage || 'Not provided'}
          </Typography>
        </Box>
        <Box 
          display="grid" 
          gridTemplateColumns="1.5fr 1fr" 
          alignItems="center"
          style={{ gap: '1rem' }}
        >
          <Typography color="#6b7280" fontSize="0.875rem">
            Relevant Documents:
          </Typography>
          <DocumentItem fileName="Business plan pdf" />
        </Box>
      </ReviewCard>

      <Box mb="2rem">
        <Typography 
          variant="h3" 
          fontSize="1.125rem" 
          fontWeight="600" 
          color="#111827" 
          mb="1rem"
        >
          Declaration & Consent
        </Typography>
        
        <RadioOption 
          checked={formData.confirmAccuracy || false}
          onChange={(checked) => {/* Handle state update */}}
          required
        >
          I confirm that the information provided is accurate to the best of my knowledge
        </RadioOption>
        
        <RadioOption 
          checked={formData.consentContact || false}
          onChange={(checked) => {/* Handle state update */}}
          required
        >
          I consent to DFSA contacting me regarding this enquiry
        </RadioOption>
      </Box>
    </Box>
  )
}

export default ReviewSubmitStep
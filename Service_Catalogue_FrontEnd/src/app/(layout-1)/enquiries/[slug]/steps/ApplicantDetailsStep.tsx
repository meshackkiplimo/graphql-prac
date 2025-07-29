import { StepProps } from '../SteppedForm'
import { Input } from '@mui/material'
import Box from '@component/Box'
import FlexBox from '@component/FlexBox'
import Typography from '@component/Typography'

const InputField = ({ label, value, onChange, placeholder, type = "text" }: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: string
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
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      fullWidth
      disableUnderline
      sx={{
        padding: '0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        fontSize: '0.875rem',
        backgroundColor: 'white',
        '&:focus-within': {
          borderColor: '#9B1823',
          outline: '2px solid #9B1823',
          outlineOffset: '-1px'
        },
        '& input': {
          padding: 0
        }
      }}
    />
  </Box>
)

const ApplicantDetailsStep = ({ formData, updateFormData }: StepProps) => {
  return (
    <Box mb="1.5rem">
      <Typography 
        variant="h2" 
        fontSize="1.5rem" 
        fontWeight="600" 
        color="#111827" 
        mb="1.5rem"
      >
        Basic Information
      </Typography>
      
      <Box 
        display="grid" 
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        style={{ gap: '1.5rem' }}
      >
        <InputField
          label="First Name"
          value={formData.firstName || ''}
          onChange={(value) => updateFormData('firstName' as keyof typeof formData, value)}
          placeholder="Enter your first name"
        />
        
        <InputField
          label="Other Names"
          value={formData.otherNames || ''}
          onChange={(value) => updateFormData('otherNames' as keyof typeof formData, value)}
          placeholder="Enter your middle/last name"
        />
        
        <InputField
          label="Organisation Name"
          value={formData.organisationName || ''}
          onChange={(value) => updateFormData('organisationName' as keyof typeof formData, value)}
          placeholder="Enter the name of your organisation"
        />
        
        <InputField
          label="Role/Title"
          value={formData.roleTitle || ''}
          onChange={(value) => updateFormData('roleTitle' as keyof typeof formData, value)}
          placeholder="e.g., Compliance Officer, Legal Advisor"
        />
        
        <InputField
          label="Email Address"
          value={formData.emailAddress || ''}
          onChange={(value) => updateFormData('emailAddress' as keyof typeof formData, value)}
          placeholder="Enter your email address"
          type="email"
        />
        
        <InputField
          label="Phone Number"
          value={formData.phoneNumber || ''}
          onChange={(value) => updateFormData('phoneNumber' as keyof typeof formData, value)}
          placeholder="Enter your phone number"
          type="tel"
        />
      </Box>
    </Box>
  )
}

export default ApplicantDetailsStep
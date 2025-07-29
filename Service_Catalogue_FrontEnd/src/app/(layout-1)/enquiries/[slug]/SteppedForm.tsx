'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { ChevronRight, Check, ArrowRight, ArrowLeft } from 'lucide-react'

// Step Components
import IntroductionStep from './steps/IntroductionStep'
import ApplicantDetailsStep from './steps/ApplicantDetailsStep'
import EnquiryDetailsStep from './steps/EnquiryDetailsStep'
import ReviewSubmitStep from './steps/ReviewSubmitStep'

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 3rem 1rem;
  
  @media (min-width: 640px) {
    padding: 3rem 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem 2rem;
  }
`

const MaxWidthContainer = styled.div`
  max-width: 96rem;
  margin: 0 auto;
`

const Breadcrumb = styled.nav`
  margin-bottom: 2rem;
`

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`

const BreadcrumbItem = styled.li`
  &:last-child {
    color: #A39161;
  }
`

const MainCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  overflow: hidden;
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`

const Sidebar = styled.div`
  width: 100%;
  border-right: 1px solid #e5e7eb;
  background-color: #f9fafb;
  padding: 1.5rem;
  
  @media (min-width: 1024px) {
    width: 20rem;
  }
`

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const StepNumber = styled.div<{ $active: boolean; $completed: boolean }>`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  
  ${({ $active, $completed }) => {
    if ($active) {
      return `
        background-color: #9B1823;
        color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      `;
    } else if ($completed) {
      return `
        background-color: #9B18230D;
        color: #9B1823;
      `;
    } else {
      return `
        background-color: #e5e7eb;
        color: #6b7280;
      `;
    }
  }}
`

const StepContent = styled.div`
  flex: 1;
  min-width: 0;
`

const StepTitle = styled.p<{ $active: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $active }) => $active ? '#111827' : '#6b7280'};
`

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  gap: 1rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`

const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'outline'; $disabled?: boolean }>`
  padding: 0.75rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  
  ${({ $variant, $disabled }) => {
    if ($disabled) {
      return `
        border: 1px solid #d1d5db;
        color: #9ca3af;
        cursor: not-allowed;
        background: white;
      `;
    } else if ($variant === 'primary') {
      return `
        background-color: #9B1823;
        color: white;
        border: 1px solid #9B1823;
        padding: 0.75rem 1.5rem;
        
        &:hover {
          background-color: #7A1319;
        }
      `;
    } else if ($variant === 'outline') {
      return `
        border: 1px solid #9B1823;
        color: #9B1823;
        background: white;
        
        &:hover {
          background-color: #9B18230D;
        }
      `;
    } else {
      return `
        border: 1px solid #d1d5db;
        color: #374151;
        background: white;
        
        &:hover {
          background-color: #f9fafb;
        }
      `;
    }
  }}
`

const SuccessContainer = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  padding: 2rem;
  text-align: center;
`

const SuccessIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #9B18230D;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
`

const SuccessTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

const SuccessText = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
`

// Interface
export interface FormData {
  // Basic Information
  firstName: string
  otherNames: string
  organisationName: string
  roleTitle: string
  emailAddress: string
  phoneNumber: string
  
  // Enquiry Details
  enquiryType: string
  subject: string
  enquiryMessage: string
  
  // Declaration & Consent
  confirmAccuracy: boolean
  consentContact: boolean

}

export interface StepProps {
  formData: FormData
  updateFormData: (field: keyof FormData, value: string) => void
}

const steps = [
  {
    id: 1,
    title: 'Introduction'
  },
  {
    id: 2,
    title: 'Applicant Details'
  },
  {
    id: 3,
    title: 'Enquiry Details'
  },
  {
    id: 4,
    title: 'Review & Submit'
  }
]

export default function SteppedForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    otherNames: '',
    organisationName: '',
    roleTitle: '',
    emailAddress: '',
    phoneNumber: '',
    enquiryType: '',
    subject: '',
    enquiryMessage: '',
    confirmAccuracy: false,
    consentContact: false,

  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsComplete(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSaveAndContinueLater = () => {
    // Add your save logic here
    console.log('Saving form data:', formData)
    alert('Form saved successfully! You can continue later.')
  }

  const handleReset = () => {
    setCurrentStep(1)
    setIsComplete(false)
    setFormData({
      firstName: '',
      otherNames: '',
      organisationName: '',
      roleTitle: '',
      emailAddress: '',
      phoneNumber: '',
      enquiryType: '',
      subject: '',
      enquiryMessage: '',
      confirmAccuracy: false,
      consentContact: false,
    })
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <IntroductionStep />
      case 2:
        return <ApplicantDetailsStep formData={formData} updateFormData={updateFormData} />
      case 3:
        return <EnquiryDetailsStep formData={formData} updateFormData={updateFormData} />
      case 4:
        return <ReviewSubmitStep formData={formData} />
      default:
        return null
    }
  }

  if (isComplete) {
    return (
      <Container>
        <MaxWidthContainer>
          <SuccessContainer>
            <SuccessIcon>
              <Check size={32} color="#9B1823" />
            </SuccessIcon>
            <SuccessTitle>Form Submitted Successfully!</SuccessTitle>
            <SuccessText>Thank you for your enquiry. We will get back to you soon.</SuccessText>
            <Button $variant="primary" onClick={handleReset}>
              Submit Another Enquiry
            </Button>
          </SuccessContainer>
        </MaxWidthContainer>
      </Container>
    )
  }

  return (
    <Container>
      <MaxWidthContainer>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Enquiries</BreadcrumbItem>
            <ChevronRight size={16} />
            <BreadcrumbItem>General Enquiries</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <MainCard>
          <CardContent>
            <Sidebar>
              <StepContainer>
                {steps.map((step) => (
                  <Step key={step.id}>
                    <StepNumber
                      $active={currentStep === step.id}
                      $completed={currentStep > step.id}
                    >
                      {currentStep > step.id ? (
                        <Check size={16} />
                      ) : (
                        step.id
                      )}
                    </StepNumber>
                    <StepContent>
                      <StepTitle $active={currentStep === step.id}>
                        {step.title}
                      </StepTitle>
                    </StepContent>
                  </Step>
                ))}
              </StepContainer>
            </Sidebar>

            <MainContent>
              {renderStepContent()}

              <ButtonContainer>
                {/* Left side - Previous button (only show from step 2 onwards) */}
                <div>
                  {currentStep > 1 && (
                    <Button onClick={handleBack}>
                      <ArrowLeft size={16} />
                      Previous
                    </Button>
                  )}
                </div>
                
                {/* Right side - Save and Continue Later + Next/Submit */}
                <ButtonGroup>
                  {/* Save and Continue Later button (show on steps 2, 3, 4) */}
                  {currentStep > 1 && (
                    <Button $variant="outline" onClick={handleSaveAndContinueLater}>
                      Save and continue later
                    </Button>
                  )}
                  
                  {/* Next/Submit button */}
                  <Button $variant="primary" onClick={handleNext}>
                    <span>{currentStep === steps.length ? 'Submit' : currentStep === 1 ? 'Start Enquiry' : 'Next'}</span>
                    {currentStep === steps.length ? (
                      <ArrowRight size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </Button>
                </ButtonGroup>
              </ButtonContainer>
            </MainContent>
          </CardContent>
        </MainCard>
      </MaxWidthContainer>
    </Container>
  )
}
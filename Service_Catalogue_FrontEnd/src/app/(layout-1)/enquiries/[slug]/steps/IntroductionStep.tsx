import styled from 'styled-components'

const ContentSection = styled.div`
  margin-bottom: 1.5rem;
`

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.5rem;
`

const IntroContent = styled.div`
  margin-top: 1.5rem;
  
  p {
    color: #6b7280;
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  strong {
    font: bold;
  }
  
  a {
    color: #9B1823;
    text-decoration: underline;
    font-weight: 600;
    
    &:hover {
      color: #7A1319;
    }
  }
`

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  color: #111827;
  margin-bottom: 0.75rem;
  margin-top: 2rem;
`

const GuidelinesList = styled.ul`
  margin-top: 0.5rem;
  
  li {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }
`

const IntroductionStep = () => {
  return (
    <ContentSection>
      <Title>Introduction</Title>
      <IntroContent>
        <p>This form facilitates <strong>General Enquiries</strong> to the Dubai Financial Services Authority (DFSA)</p>
        <p>It is intended for individuals or firms seeking clarification, further information, or assistance regarding <strong>DFSA's regulatory framework, operations or services</strong></p>
        <p>Please provide detailed or accurate information to allow us to respond to your enquiry effectively</p>
        
        <SectionTitle>General Information</SectionTitle>
        <p>General information about the DFSA and specific information on authorisation and registration processes are available <a href="#" target="_blank" rel="noopener noreferrer">here</a></p>
        <p>Defined terms are identified throughout this survey by the capitalisation of the first letter in a word or of each word in a phrase and are defined in the <a href="#" target="_blank" rel="noopener noreferrer">Glossary Module (GLO)</a> of the DFSA Rulebook</p>

        <SectionTitle>Important Guidelines</SectionTitle>
        <GuidelinesList>
          <li>Please ensure that all information provided is complete, accurate and up to date</li>
          <li>If you are seeking to initiate a formal service process (e.g., Authorisation, Supervision, Innovation Testing Licence), please complete the relevant specific enquiry form</li>
          <li>Incomplete or unclear enquiries may lead to delays in our response</li>
          <li>DFSA will treat all information provided as confidential and in accordance with applicable regulations</li>
        </GuidelinesList>
      </IntroContent>
    </ContentSection>
  )
}

export default IntroductionStep

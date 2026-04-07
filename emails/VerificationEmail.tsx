import {
  Html,
  Head,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Body,
  Container,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your verification code: {otp}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Row>
              <Heading as="h2">Hello {username},</Heading>
            </Row>

            <Row>
              <Text>
                Thank you for registering on <strong>Anonymously</strong>.
              </Text>
            </Row>

            <Row>
              <Text>
                Use the following verification code:
              </Text>
            </Row>

            <Row>
              <Text style={code}>{otp}</Text>
            </Row>

            <Row>
              <Text>This code will expire in 10 minutes.</Text>
            </Row>

            <Row>
              <Text style={footer}>
                If you did not request this, please ignore this email.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

//Styles for email

const main = {
  backgroundColor: "#f6f9fc",
  padding: "20px",
  fontFamily: "Arial, Verdana, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "8px",
};

const code = {
  fontSize: "24px",
  fontWeight: "bold",
  letterSpacing: "6px",
  margin: "20px 0",
};

const footer = {
  fontSize: "12px",
  color: "#888",
};
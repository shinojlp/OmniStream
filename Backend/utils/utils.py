import random
import string
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def generate_reset_token():
      # Define the pool of characters from which to generate the token
      characters = string.ascii_uppercase  + string.digits
      # Generate a random token of length 5
      token = ''.join(random.choices(characters, k=5))
      return token


def send_email(receiver_email, subject, body):
    # Email configurations
    sender_email = "modelprac@gmail.com"  # Your Gmail address
    sender_password = "maje lxlo dxwo aevr"  # Your Gmail password

    # Create message container
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject

    # Attach body to the email
    message.attach(MIMEText(body, 'plain'))

    # Connect to Gmail's SMTP server
    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
        print("Email sent successfully")
    except smtplib.SMTPAuthenticationError:
        print("Failed to authenticate with Gmail's SMTP server. Please check your email and password.")
    except Exception as e:
        print("An error occurred while sending the email:", e)

# Example usage:
send_email("recipient@gmail.com", "Test Subject", "This is a test email.")

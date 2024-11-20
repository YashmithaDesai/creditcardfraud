from flask import Flask, render_template, request, jsonify
import joblib
import numpy as np
from sklearn.preprocessing import RobustScaler
import smtplib
from email.mime.text import MIMEText
import pandas as pd

app = Flask(__name__)

# Load the dataset for validation and preprocessing information
df = pd.read_csv('templates/creditcard.csv')

# Calculate the minimum and maximum times
min_time = df['Time'].min()
max_time = df['Time'].max()

# Load the trained logistic model
logistic_model = joblib.load('trained_models/logistic_model.pkl')

def send_email(to_address, subject, message):
    from_address = 'amulyavm.cy23@rvce.edu.in'
    password = 'Vinathi@123'
    msg = MIMEText(message)
    msg['Subject'] = subject
    msg['From'] = from_address
    msg['To'] = to_address
    
    try:
        print("Connecting to SMTP server...")
        server = smtplib.SMTP('smtp.gmail.com', 587)  # Assuming you are using Gmail SMTP
        server.starttls()
        print("Logging in to email account...")
        server.login(from_address, password)
        print("Sending email...")
        server.sendmail(from_address, to_address, msg.as_string())
        print("Email sent successfully.")
        server.quit()
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    try:
        time = float(data['time'])
        amount = float(data['amount'])

        if time < 0 or amount < 0:
            return jsonify({'message': 'Error: Invalid input: Time and amount must be non-negative.'})

        # Check if the data exists in the dataset
        if not ((df['Time'] == time) & (df['Amount'] == amount)).any():
            return jsonify({'message': 'normal'})

        # Preprocess the input similar to your training data
        amount = RobustScaler().fit_transform(np.array([[amount]])).flatten()[0]
        time = (time - min_time) / (max_time - min_time)  # Scale time feature correctly

        # Create an input array with default values for other features
        input_data = np.zeros((1, df.shape[1] - 1))
        input_data[0, df.columns.get_loc('Time')] = time
        input_data[0, df.columns.get_loc('Amount')] = amount
        
        # Predict
        try:
            prediction = logistic_model.predict(input_data)[0]
        except Exception as e:
            return jsonify({'message': 'Error occurred during prediction: {}'.format(str(e))})

        if prediction == 0:
            return jsonify({'message': 'fraud.'})
        
        elif prediction == 1:
            return jsonify({'message': 'normal'})
        
    except (ValueError, KeyError):
        return jsonify({'message': 'Error: Invalid data: Please ensure that time and amount are valid numbers.'})

@app.route('/send_email', methods=['POST'])
def email():
    data = request.get_json()
    email = 'eshithachowdary.nettem@gmail.com'  # Fixed recipient email address
    if email:
        subject = "Fraudulent Transaction Detected"
        message = "A fraudulent transaction has been detected. Please review the transaction details."
        try:
            send_email(email, subject, message)
            return jsonify({'message': 'Email sent successfully'})
        except Exception as e:
            return jsonify({'message': f'Error: {e}'})
    return jsonify({'message': 'Error: Email address is required'})

if __name__ == '__main__':
    app.run(debug=True)

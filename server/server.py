from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from PIL import Image
import numpy as np
import tensorflow as tf
import shutil

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the saved CNN model
model = tf.keras.models.load_model("models\Eye_Classifier.h5")

def preprocess_image(file):
    # Open the image file
    img = Image.open(file)

    # Resize the image to match the input shape
    img = img.resize((256, 256))

    # Convert the image to RGB if it's not already in RGB format
    if img.mode != 'RGB':
        img = img.convert('RGB')

    # Convert to NumPy array
    img_array = np.array(img)

    # Perform mean subtraction and standard deviation normalization
    img_array = img_array.astype('float32')
    img_array -= np.mean(img_array)
    img_array /= np.std(img_array)

    # Add a batch dimension
    img_array = np.expand_dims(img_array, axis=0)

    return img_array

def predict_eye_condition(processed_image):
    # Perform inference
    prediction = model.predict(processed_image)

    return prediction.tolist()

def get_predicted_class(prediction_result):
    # Get the index of the class with the highest probability
    predicted_class_index = np.argmax(prediction_result)

    # Map the index to the corresponding class name
    class_names = ['Cataract', 'Normal']
    predicted_class = class_names[predicted_class_index]

    return predicted_class




@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
def predict(file: UploadFile = File(...)):
    print(file)
    if file.filename == '':
        pass  # Do nothing if filename is empty

    try:
        with open(file.filename, 'wb') as f:
            shutil.copyfileobj(file.file, f)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()  # Close the file object

    # Process the uploaded image
    processed_image = preprocess_image(file.filename)
    
    # Get the prediction result
    prediction_result = predict_eye_condition(processed_image)
    
    # Get the predicted class
    predicted_class = get_predicted_class(prediction_result)
    
    # Generate content based on the predicted class
    if predicted_class == 'Normal':
        content_title = "Normal Eyes"
        content = "Your eyes are normal. No need to worry! However, it's still essential to have regular check-ups."
    else:
        content_title = "Cataract Detected"
        content = "Cataract has been detected. Please consult an ophthalmologist for further evaluation and treatment."
    
    # Return the prediction result
    return {"prediction": predicted_class, "prediction-desc": content_title, "content": content}



@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
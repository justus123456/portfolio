from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

# Load pre-trained DistilGPT-2 model and tokenizer
model_path = 'distilgpt2'
tokenizer = GPT2Tokenizer.from_pretrained(model_path)
model = GPT2LMHeadModel.from_pretrained(model_path)

# Set model to evaluation mode and move to CPU
model.eval()
device = torch.device("cpu")
model.to(device)

def answer_question(question):
    # Clear, role-based prompt to simulate a health assistant
    input_text = (
        "You are a certified and reliable medical assistant trained to provide general health advice.\n"
        "Always suggest the patient see a licensed doctor for diagnosis.\n\n"
        f"Patient: {question}\n"
        "Medical Assistant:"
    )

    # Tokenize and encode input
    inputs = tokenizer.encode(input_text, return_tensors="pt").to(device)

    # Generate the answer
    outputs = model.generate(
        inputs,
        max_length=120,
        pad_token_id=tokenizer.eos_token_id,
        no_repeat_ngram_size=2,
        repetition_penalty=1.8,
        temperature=0.6,
        top_k=40,
        top_p=0.9,
        do_sample=True,
    )

    # Decode the generated text
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    # Extract only the assistant's reply
    if "Medical Assistant:" in generated_text:
        answer = generated_text.split("Medical Assistant:")[-1].strip()
    else:
        answer = generated_text.strip()

    # Append a disclaimer
    disclaimer = (
        "\n\n Note: This is not a substitute for professional medical advice. "
        "Always consult a licensed healthcare provider for medical concerns."
    )

    return answer + disclaimer

import cohere
import os
from read import read_pdf
from dotenv import load_dotenv

load_dotenv()

NUM_SECTIONS = 4

# Produces a summary of the given text using provided API key and summarization parameters
def summarise(text: str, key: str) -> str:

    client = cohere.Client(key)

    # Divide the text into separate lists if it's longer than 1500 characters
    text_sections = []
    if len(text) > 1500:
        section_length = len(text) // NUM_SECTIONS
        text_sections = [text[i:i + section_length] for i in range(0, len(text), section_length + (section_length % NUM_SECTIONS) + 1)]
    else:
        text_sections.append(text)

    summary_list = []

    for section in text_sections:
        # Join each list into a string
        section = "".join(section)
        # Summarize each string
        response = client.summarize(
            text=section,
            model='command',
            length='long',
            extractiveness='low',
            format='bullets',
            additional_command='read these lecture slides and give the best summary for a human to learn the material from this university-level lecture'
        )
        summary_list.append(response.summary.strip())

    # Join the summaries into one string
    summary = "\n".join(summary_list)

    return summary


if __name__ == '__main__':
    api_key = os.environ.get("COHERE_API_KEY")
    print(summarise(read_pdf('test.pdf'), api_key))

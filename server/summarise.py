import cohere
import os
from read import read_pdf

# Produces a summary of the given text using provided API key and summarization parameters
def summarise(text, key, length, extractiveness):

    client = cohere.Client(key)

    # Divide the text into separate lists
    section_length = len(text) // 4
    text_sections = [text[i:i + section_length] for i in range(0, len(text), section_length)]
    summary_list = []
    print(len(text_sections))
    for section in text_sections:
        # Join each list into a string
        section = "".join(section)
        # Summarize each string
        response = client.summarize(
            text=section,
            model='command',
            length=length,
            extractiveness=extractiveness
        )
        summary_list.append(response.summary)

    # Join the summaries into one string
    summary = "\n".join(summary_list)

    return summary


if __name__ == '__main__':
    api_key = os.environ.get("COHERE_API_KEY")
    print(summarise(read_pdf('test.pdf'), api_key, "long", "medium"))

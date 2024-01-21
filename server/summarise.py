import cohere
from read import read_pdf

def summarize(file, client, length, extractiveness):
    pages = read_pdf(file)

    # Divide the pages into separate lists
    section_length = len(pages) // 4
    page_sections = [pages[i:i + section_length] for i in range(0, len(pages), section_length)]
    summary_list = []
    print(len(page_sections))
    for section in page_sections:
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
    co = cohere.Client("Z1nYWzLHwbXCdJq8beeI3ixP0rKCNN2bG93bM7B4")
    print(summarize('test.pdf', co, "long", "medium"))

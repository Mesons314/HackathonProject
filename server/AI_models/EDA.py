from ai_integrate import response_json
import json

async def extraction_of_code():
    data = response_json
    python_code = data["choices"][0]["message"]["content"]

    start = python_code.find("```python") + len("```python\n")
    end = python_code.find("```", start)

    extracted_code = python_code[start:end]

    print(extracted_code)

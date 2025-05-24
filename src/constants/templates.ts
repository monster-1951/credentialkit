export const mcq = `- mcq:
{
  "type": "mcq",
  "question": "1. What is the capital of France?",
  "options": ["Berlin", "Madrid", "Paris", "Rome"],
  "answer": "Paris",
  "explanation": "Paris is the capital city of France."
}`;

export const short_answer = `- short_answer:
{
  "type": "short_answer",
  "question": "2. Define osmosis.",
  "answer": "Osmosis is the diffusion of water across a semipermeable membrane.",
  "keywords": ["diffusion", "water", "semipermeable membrane"]
}`;

export const long_answer = `- long_answer:
{
  "type": "long_answer",
  "question": "3. Explain the process of photosynthesis.",
  "answer": "1. Photosynthesis begins with the absorption of sunlight by chlorophyll, the green pigment in plant cells. This light energy triggers the conversion of carbon dioxide and water into glucose and oxygen.\n\n2. Water is absorbed from the soil through the roots and transported to the leaves via the xylem. This is essential for the light-dependent reactions to occur in the chloroplasts.\n\n...(add 10–15 sub-points, each minimum 30 words)...",
  "key_points": [
    "Chlorophyll absorbs sunlight to start the process.",
    "Roots absorb water for photosynthesis.",
    ...
  ]
}`;

export const true_false = `- true_false:
{
  "type": "true_false",
  "question": "4. The heart has four chambers.",
  "answer": true,
  "explanation": "The human heart consists of two atria and two ventricles."
}`;

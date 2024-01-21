from summarise import summarise
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Make a call to Open AI API to define key terms in given text summary
def define(text, key):
	client = OpenAI(api_key=key)
	print(key)

	completion = client.chat.completions.create(
	  model="gpt-3.5-turbo",
	  messages=[
	    {"role": "system", "content": "Define key terms in the following lecture slide summary:"},
	    {"role": "user", "content": text},
	  ]
	)

	return completion.choices[0].message.content

def generate_problems(text, key):
	client = OpenAI(api_key=key)

	completion = client.chat.completions.create(
	  model="gpt-3.5-turbo",
	  messages=[
	    {"role": "system", "content": "Generate a list of practice problems from the following lecture slide summary:"},
	    {"role": "user", "content": text},
	  ]
	)

	return completion.choices[0].message.content


if __name__ == '__main__':
	example_summary = """Today's lecture covered the gravitational force and Newton's law of universal gravitation. The force of gravity is determined by the orbit of two objects and is defined by the equation F = G * m1 * m2 / r^2, where G is Newton's constant, m1 and m2 are the masses of the two objects, and r is the distance between them. In addition, the class weighed the Sun using the principle that an object moving in a circle experiences a centripetal force equal to F = m * r, which must equal the gravitational force exerted by the Sun on the Earth. The Sun's mass was then calculated to be 1.99 x 1030 kg.
Calculate the velocity of the Earth, the mass of the Sun and the weight of the Milky Way. Relate the orbital period to the semi-major axes of the ellipses of their orbits. Differentiate between forms of energy, in particular kinetic energy. Kinetic energy is proportional to the mass of an object and to the square of its velocity.
Energy can be stored as potential energy, such as chemical energy stored in food or batteries, or gravitational potential energy, which occurs when an object is at a height where gravity could cause it to accelerate. Gravitational potential energy on Earth is calculated with the formula U = mgh, where m is the object's mass, h is its height and g is the acceleration due to gravity, which is 9.8 m/s2. Planets, moons and satellites also have kinetic and gravitational potential energy, which is conserved for bound orbits, such as satellites orbiting Earth.
A baseball thrown faster than the escape speed will leave the Earth and never return. This can be derived by setting KE+UE=0 to unbind the object. For the Earth, this escape speed is 11.2 km/s. If the Earth's mass was 6 x 1024kg, what would the Earth's radius have to be in order for the escape velocity from its surface to be equal to the speed of light, 300,000 km/s?
Astronomers estimate that a companion object to a visible star is a black hole with a mass of around 68M☉. The object is around 1.5AU from the star, which is further than the distance between the Earth and the Sun. Astronauts in the International Space Station orbiting Earth 400km above its surface report feeling weightless, which is not due to being beyond the pull of gravity, but because they and the ISS are falling together around the Earth in a state of freefall.
"""

	key_terms = define(example_summary, os.environ.get("OPENAI_API_KEY"))
	print(key_terms)
	problems = generate_problems(example_summary, os.environ.get("OPENAI_API_KEY"))
	print(problems)


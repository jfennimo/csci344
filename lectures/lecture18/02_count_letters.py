# Challenge: 
#   1. How many unique letters are in the word supercalifragilisticexpialidocious?
#   2. How many times does each letter occur?

# Your job: loop through each letter of the word.

'''
make an empty dictionary
check if it's in the dictionary already:
if it is, increment it. "seeing it again"
otherwise, add the key with the value of 1. "first time I'm seeing it"
'''

word = 'supercalifragilisticexpialidocious'
letter_count = dict()

for letter in word:
    print(letter)
    # is the letter in the dictionary:
    if letter_count.get(letter):
        letter_count[letter] += 1
    else:
        print('Seeing', letter, 'for the first time')
        letter_count[letter] = 1

print(letter_count)



'''

My way:

from collections import defaultdict

word = 'supercalifragilisticexpialidocious'
chars = defaultdict(int)

for letter in word:
    print(letter)

for char in word:
    chars[char] += 1

print(chars)
'''

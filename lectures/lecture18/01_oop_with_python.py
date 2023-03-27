class Person:

    # this is the constructor: 
    def __init__(self, name, age, first_language='en'):
        self.name = name
        self.age = age
        self.first_language = first_language

    # method that prints a greeting
    def sayGreeting(self):
        if self.first_language == 'en':
            print(self.name, 'says', 'hello')
        elif self.first_language == 'es':
            print(self.name, 'says', 'hola')
        else:
            print('language not known')

    # private method
    def __setAge(self, newAge):
        self.age = newAge


# create two instances of this class
person1 = Person('Shirly', 67)
person2 = Person('Walter', 67, first_language='es')
person1.sayGreeting()
person2.sayGreeting()
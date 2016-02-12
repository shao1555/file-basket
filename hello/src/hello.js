function Person() {
  this.name = 'SAWADA';
  this.age = 30;
  this.hello = () => {
    console.log(`Hello, ${this.name}`);
  }
}

var person = new Person();
person.hello();

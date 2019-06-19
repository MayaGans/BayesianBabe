const PREFIX = class Analysis {

  // Create a new container.
  constructor () {
    this.value = 0
  }

  // Add one.
  increment () {
    this.value += 1
    return this
  }

  // Display.
  display () {
    console.log(this.value)
  }
}
`

// The kind of block we might put at the top of a stack.
class CreateDataSetBlock {
  constructor () {}
  generate_code () {
    return 'new Analysis()'
  }
}

// The kind of block we might put in the middle of the stack.
class IncrementDataSetBlock {
  constructor () {}
  generate_code () {
    return '.increment()'
  }
}

// The kind of block we might put at the bottom of the stack.
class DisplayDataSetBlock {
  constructor () {}
  generate_code () {
    return '.display()'
  }
}

// When the user clicks 'run', we ask each block in the stack to generate code
// and concatenate all the results.
const write_the_program = (blocks) => {
  let result = ''
  for (let b of blocks) {
    result += b.generate_code()
  }
  return result
}

// Let's try it out.
// First we make a stack of blocks.
// (In a real version, we'd do this by creating blocks and connecting them.)
const stack = [
  new CreateDataSetBlock(),
  new IncrementDataSetBlock(),
  new DisplayDataSetBlock()
]

// Next, we generate the code for that stack of blocks.
const my_program = PREFIX + write_the_program(stack)

// Let's see what it looks like.
console.log('/** the program **/')
console.log(my_program)

// And now let's run it.
console.log('/** its output **/')
eval(my_program)
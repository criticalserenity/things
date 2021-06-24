expect.extend({
  toContainObject(received, argument) {
    const pass = this.equals(received, expect.arrayContaining([expect.objectContaining(argument)]))

    return {
      message: () =>
        `expected
${this.utils.printReceived(received)}
${pass ? 'not ' : ''} to contain object
${this.utils.printExpected(argument)}`,
      pass: !!pass,
    }
  },
})

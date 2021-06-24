global.mockLocation = () => {
  const { location } = window

  // eslint-disable-next-line jest/require-top-level-describe
  beforeEach(() => {
    delete window.location
    window.location = { ...location, assign: jest.fn(), reload: jest.fn(), replace: jest.fn() }
  })

  // eslint-disable-next-line jest/require-top-level-describe
  afterEach(() => {
    window.location = location
  })
}

global.matchMedia ||= () => ({
  matches: false,
  media: null,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

global.ResizeObserver = class ResizeObserver {
  /* eslint-disable */
  observe() {}
  unobserve() {}
  /* eslint-enable */
}

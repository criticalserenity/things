/* eslint-disable import/no-extraneous-dependencies */

import 'jest-enzyme'
import 'jest-styled-components'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { configure } from 'enzyme'
import './assertions'
import './mockStore'
import './suppression'
import './utils'

configure({ adapter: new Adapter() })

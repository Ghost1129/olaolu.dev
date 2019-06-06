import Vue from 'vue'
import StyledNavigation from './styles'
import { goToSection } from '@/helpers'

const Navigation = Vue.component('Navigation', {
  methods: {
    goToSection: event =>
      goToSection(document.querySelector(event.target.getAttribute('href'))),
  },

  render() {
    return (
      <StyledNavigation role="navigation" aria-label="Main navigation">
        <ul ref="list">
          <Link clickFn={this.goToSection} href="#une" class="current">
            1
          </Link>
          <Link clickFn={this.goToSection} href="#deux">
            2
          </Link>
          <Link clickFn={this.goToSection} href="#trois">
            3
          </Link>
          <Link clickFn={this.goToSection} href="#quatre">
            4
          </Link>
        </ul>
      </StyledNavigation>
    )
  },
})

const Link = Vue.component('Link', {
  render() {
    const { href, external, clickFn } = this

    return (
      <li>
        <a
          href={href}
          onClick={e => {
            this.href.charAt(0) === '#' && e.preventDefault()
            typeof clickFn === 'function' && clickFn.call(this, e)
          }}
          target={external && '_blank'}
          rel={external && 'noreferrer noopener'}
        >
          {this.$slots.default}
        </a>
      </li>
    )
  },

  props: {
    href: String,
    clickFn: Function,
    external: { type: Boolean, default: false },
  },
})

export { Navigation, Link }
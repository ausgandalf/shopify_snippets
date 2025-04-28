const state = {
  groups: {},
  dom: {}
}

const qs = {
  accordion: 'data-accordion',
  accordionTitle: 'data-accordion-title',
  accordionDesc: 'data-accordion-content'
}

const cacheDom = () => {
  const allAccordions = document.querySelectorAll(`[${qs.accordion}]`)
  state.dom.buttons = document.querySelectorAll(`[${qs.accordionTitle}]`)

  // Seperate all accordions into groups for easy open/close within group later
  ;[...allAccordions].forEach(accordion => {
    const group = accordion.getAttribute(qs.accordion)
    if (!state.groups.hasOwnProperty(group)) {
      state.groups[group] = []
    }
    state.groups[group].push(accordion)
  })
}

const initAccordions = () => {
  cacheDom()

  state.dom.buttons.forEach(button => {
    button.addEventListener('click', () => {
      const buttonParent = button.parentNode
      const group = buttonParent.getAttribute(qs.accordion)

      state.groups[group].forEach(accordion => {
        if (accordion === buttonParent) {
          accordion
            .querySelector(`[${qs.accordionDesc}]`)
            .classList.toggle('expanded')
        } else {
          accordion
            .querySelector(`[${qs.accordionDesc}]`)
            .classList.remove('expanded')
        }
      })
    })
  })
}

export const setupAccordions = () => {
  initAccordions()
}

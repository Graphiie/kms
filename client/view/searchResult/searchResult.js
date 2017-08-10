/**
 * Search Result view
 * Items are represented with rows
 */
import View from '../view'
import Util from '../../../core/util'
import template from './searchResult.html'
import rowTemplate from './row.html'
import './searchResult.scss'

export default class SearchResult extends View {
  constructor (p) {
    super(p)

    const $html = $(template())

    if (this.p.hidden) $html.css('display', 'none')
    this.p.container.append($html)
    this.elements = Util.findElements($html, this.selectors)

    this.elements.list.on('click', this._onRowClick.bind(this))
    this.p.selection.on('change', this._onSelectionChange.bind(this))
  }

  get selectors () {
    return {
      list: '.items-list',
      title: '.title',
    }
  }
  /**
   * populate list with items
   */
  render (itemsMap) {
    const list = _.map(itemsMap, (value, key) => rowTemplate({ value, key })).join('')
    this.elements.list.html(list)
  }
  /**
   * Select row in click
   */
  _onRowClick (e) {
    const $el = $(e.target)
    const key = $el.data('key')

    this.p.selection.clear()
    this.p.selection.add(key)
  }
  /**
   * Highlight selected row
   * @param Array selection keys
   */
  _onSelectionChange (selection) {
    _.each(selection, (key) => {
      this.elements.list.find(`li[data-key="${key}"]`).toggleClass('selected')
    })
  }

  setTitle (title) {
    this.title = title
    this.elements.title.text(this.title)
    this.elements.title.show()
  }
}
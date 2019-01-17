import React from 'react'

const marked = require('marked')

marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
}

const defaultText = 
`# React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
    - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)`

class App extends React.Component {
  state = {
    markdown: defaultText
  }
  updateMarkdown = (event) => {
    const value = event.target.value;

    this.setState(() => ({
      markdown: value
    }))
  }
  render() {
    const {markdown} = this.state;
    const {updateMarkdown} = this;

    return (
      <div className='container'>
        <div className='input'>
          <label>Input</label>
          <textarea
            id='editor'
            rows='49'
            value={markdown}
            autoComplete='off'
            onChange={updateMarkdown}
            type='text'
          />
        </div>
        <div className='output'>
          <label>Output</label>
          <div
            id='preview'
            dangerouslySetInnerHTML = {{__html: marked(markdown, { renderer: renderer })}}
          />
        </div>
      </div>
    )
  }
}

export default App;
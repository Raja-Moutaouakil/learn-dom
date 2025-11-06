// DOM Tutorial Website
document.addEventListener('DOMContentLoaded', () => {
    // Create header
    const header = document.createElement('header');
    header.className = 'header';
    
    const headerContent = document.createElement('div');
    headerContent.className = 'header-content';
    
    const mainTitle = document.createElement('h1');
    mainTitle.textContent = 'Learn JavaScript DOM';
    
    const tagline = document.createElement('p');
    tagline.textContent = 'Interactive DOM Practice Platform';
    
    headerContent.appendChild(mainTitle);
    headerContent.appendChild(tagline);
    header.appendChild(headerContent);
    document.body.appendChild(header);

    // Create main container
    const container = document.createElement('div');
    container.className = 'container';

    // Demo element for practice
    const demoElement = document.createElement('div');
    demoElement.id = 'demoElement';
    demoElement.className = 'section';
    
    // Build demo element content
    const demoNote = document.createElement('div');
    demoNote.style.opacity = '0.75';
    demoNote.style.fontSize = '0.9rem';
    demoNote.style.marginBottom = '8px';
    demoNote.textContent = '↓ Practice Element ↓';
    
    const demoTitle = document.createElement('div');
    demoTitle.style.fontSize = '1.2rem';
    demoTitle.style.fontWeight = '600';
    demoTitle.textContent = 'Demo Element';
    
    const demoHint = document.createElement('div');
    demoHint.style.opacity = '0.75';
    demoHint.style.fontSize = '0.85rem';
    demoHint.style.marginTop = '8px';
    demoHint.textContent = 'Use the editors below to modify this element';
    
    demoElement.appendChild(demoNote);
    demoElement.appendChild(demoTitle);
    demoElement.appendChild(demoHint);
    container.appendChild(demoElement);

    // Tutorial sections data
    const sections = [
        {
            title: 'What is the DOM?',
            content: 'The Document Object Model (DOM) is a programming interface for HTML documents. It represents the page as a tree-like structure where each element becomes a node that you can manipulate with JavaScript.',
            example: `// Inspect the document object
console.log('Page title:', document.title);
console.log('Body element:', document.body);`,
            practice: `// Try displaying the document title
output.textContent = 'Current page title: ' + document.title;`
        },
        {
            title: 'Selecting Elements',
            content: 'JavaScript provides several ways to select DOM elements. The most common methods are getElementById(), querySelector(), and querySelectorAll(). These let you find elements by their ID, class, tag name, or any valid CSS selector.',
            example: `// Different ways to select elements
const byId = document.getElementById('demoElement');
const byQuery = document.querySelector('#demoElement');
console.log('Selected element:', byId);`,
            practice: `// Select the demo element and change its style
const element = document.getElementById('demoElement');
element.style.backgroundColor = '#2d2d2d';
element.style.color = '#e2e8f0';`
        },
        {
            title: 'Modifying Elements',
            content: 'Once you select an element, you can modify its content, attributes, and styles. Common properties include textContent for text, innerHTML for HTML content, and style for CSS properties.',
            example: `// Change element content and style
const element = document.getElementById('demoElement');
element.textContent = 'Modified with JavaScript!';
element.style.padding = '20px';`,
            practice: `// Try changing the demo element
const demo = document.getElementById('demoElement');
demo.style.border = '2px solid #00bfa6';
demo.querySelector('div:nth-child(2)').textContent = 'Modified!';`
        },
        {
            title: 'Creating Elements',
            content: 'You can create new elements using createElement() and add them to the page using appendChild() or insertBefore(). This is how you dynamically build content.',
            example: `// Create and add a new element
const newParagraph = document.createElement('p');
newParagraph.textContent = 'Created dynamically!';
output.appendChild(newParagraph);`,
            practice: `// Create a button that adds text
const btn = document.createElement('button');
btn.textContent = 'Add Text';
btn.onclick = () => {
    const text = document.createElement('div');
    text.textContent = 'New text added!';
    output.appendChild(text);
};
output.appendChild(btn);`
        },
        {
            title: 'Event Handling',
            content: 'Events let you respond to user actions like clicks, key presses, and mouse movements. Use addEventListener() to handle these events and create interactive pages.',
            example: `// Add click event listener
const button = document.createElement('button');
button.textContent = 'Click me';
button.addEventListener('click', () => {
    console.log('Button clicked!');
});
output.appendChild(button);`,
            practice: `// Create an interactive button
const button = document.createElement('button');
button.textContent = 'Toggle Color';
button.onclick = () => {
    const demo = document.getElementById('demoElement');
    demo.style.backgroundColor = 
        demo.style.backgroundColor === 'rgb(45, 45, 45)' 
            ? 'transparent' 
            : '#2d2d2d';
};
output.appendChild(button);`
        }
    ];

    // Create section cards
    function createSection(data) {
        const section = document.createElement('section');
        section.className = 'section';

        const title = document.createElement('h2');
        title.textContent = data.title;
        section.appendChild(title);

        const content = document.createElement('p');
        content.textContent = data.content;
        section.appendChild(content);

        const example = document.createElement('pre');
        example.className = 'example';
        const code = document.createElement('code');
        code.textContent = data.example;
        example.appendChild(code);
        section.appendChild(example);

        const practice = document.createElement('div');
        practice.className = 'practice-area';

        const practiceLabel = document.createElement('p');
        practiceLabel.textContent = 'Try it yourself:';
        practiceLabel.style.opacity = '0.8';
        practiceLabel.style.marginBottom = '10px';
        practice.appendChild(practiceLabel);

        const textarea = document.createElement('textarea');
        textarea.className = 'code-input';
        textarea.value = data.practice;
        practice.appendChild(textarea);

        const runBtn = document.createElement('button');
        runBtn.className = 'run-btn';
        runBtn.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor">
            <polygon points="5 3 19 12 5 21" fill="currentColor"/>
        </svg> Run Code`;
        practice.appendChild(runBtn);

        const output = document.createElement('div');
        output.className = 'output';
        output.innerHTML = '<span style="opacity: 0.6">// Output will appear here</span>';
        practice.appendChild(output);

        // Run code functionality
        runBtn.addEventListener('click', () => {
            output.innerHTML = '';
            output.className = 'output';

            const consoleLog = {
                log: (...args) => {
                    const line = document.createElement('div');
                    line.textContent = args.map(a => 
                        typeof a === 'object' ? JSON.stringify(a) : String(a)
                    ).join(' ');
                    output.appendChild(line);
                }
            };

            try {
                const code = textarea.value;
                const fn = new Function('output', 'console', code);
                fn(output, consoleLog);
                output.classList.add('success');
            } catch (error) {
                output.classList.add('error');
                output.textContent = 'Error: ' + error.message;
            }
        });

        section.appendChild(practice);
        return section;
    }

    // Add sections with animation delay
    sections.forEach((sectionData, index) => {
        const section = createSection(sectionData);
        section.style.animationDelay = `${index * 100}ms`;
        container.appendChild(section);
    });

    // Create footer
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.textContent = 'Created for DOM learners';
    container.appendChild(footer);

    // Add scroll-to-top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.textContent = '↑';
    scrollBtn.title = 'Scroll to top';
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
    });

    // Add container to body
    document.body.appendChild(container);
});

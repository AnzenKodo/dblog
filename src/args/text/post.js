import { info } from "./text.js";

export const template = `${info.meta}
This post contents underscore(_) in filename. That means this page now consider
as a draft post and will not be included in build(--build) time.

# See [Markdown Guide](${info.markdown}) to get started
`;

export const post = `---
tags: [ "post", "firstpost", "tag" ]
---

Leverage agile frameworks to provide a robust synopsis for high level
overviews. Iterative approaches to corporate strategy foster collaborative
thinking to further the overall value proposition. Organically grow the
holistic world view of disruptive innovation via workplace diversity and
empowerment.

\`\`\`js
// this is a command
function myCommand() {
+	let counter = 0;

-	counter++;

}

// Test with a line break above this line.
console.log('Test');
\`\`\`

Bring to the table win-win survival strategies to ensure proactive domination.
At the end of the day, going forward, a new normal that has evolved from
generation X is on the runway heading towards a streamlined cloud solution.
User generated content in real-time will have multiple touchpoints for
offshoring.

## Section Header

Capitalize on low hanging fruit to identify a ballpark value added activity to
beta test. Override the digital divide with additional clickthroughs from
DevOps. Nanotechnology immersion along the information highway will close the
loop on focusing solely on the bottom line.`;

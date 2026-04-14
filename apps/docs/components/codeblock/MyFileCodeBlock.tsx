import { cn } from '@/lib/cn';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import React, { ComponentProps, useEffect, useState } from 'react';
// export async function getFileText(fileHandle: { getFile: () => any; }) {
//     const file = await fileHandle.getFile();
//     const contents = await file.text();
//     return String(contents);
// }
export function Pre(props: ComponentProps<'pre'>) {
  return (
    <pre {...props} className={cn('min-w-full w-max *:flex *:flex-col', props.className)}>
      {props.children}
    </pre>
  );
}

export default function MyFileCodeBlock({ filePath }: { filePath: string }) {
  const [code, setCode] = useState('');
useEffect(() => {
  fetch(`/code/${filePath}`) // Path relative to public folder
    .then(response => response.text())
    .then(text => setCode(text));
}, []);

  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
};
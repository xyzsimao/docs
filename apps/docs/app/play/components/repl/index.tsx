import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { cn } from '@/lib/cn';
import { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'xyzdocs-ui/components/tabs';
import jsValidator from './js-validator';
import { defaultCSS, defaultHTML, defaultJS } from './constants';
import CodeMirrorWrapper from '../codemirror-wrapper';
import { css as cmCSS } from '@codemirror/lang-css';
import { html as cmHTML } from '@codemirror/lang-html';
import { javascript as cmJS } from '@codemirror/lang-javascript';
import { T } from '../../../../../../packages/mdx/dist/core-DanW53EG';
import IFrame, { IFrameHandle } from '../iframe';
import Console, { iframeGlueScriptConstructor } from '../console';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import {  AiOutlineSync } from 'react-icons/ai';
import { FiDownload, FiPlay } from 'react-icons/fi';
import { exportContent } from './exportContent';

export interface REPLContext {
  playground: 'js' | 'web';
  setPlayground: (value: this['playground']) => void;
  maximizeREPL: boolean;
  setMaximizeREPL: (value: boolean) => void;
  autoRun: boolean;
  setAutoRun: (value: boolean | ((previousValue: boolean) => boolean)) => void;
}

const playgrounds = {
  js: {
    left: {
      items: {
        html: false,
        css: false,
        js: true,
      },
      active: 'js',
    },
    right: {
      items: {
        output: false,
        console: true,
      },
      active: 'console',
    },
  },
  web: {
    left: {
      items: {
        html: true,
        css: true,
        js: true,
      },
      active: 'html',
    },
    right: {
      items: {
        output: true,
        console: true,
      },
      active: 'output',
    },
  },
};

type Playgrounds = typeof playgrounds;

interface Props {
  container: HTMLDivElement | null;
}

export const REPLContext = createContext<REPLContext | null>(null);

export default function REPL() {
  const { playground, maximizeREPL, autoRun, setAutoRun } = useContext(REPLContext)!;
  const [tabs, dispatch] = useReducer(reducer, playgrounds[playground]);

  useEffect(() => {
    dispatch({
      type: 'CHANGE_PLAYGROUND',
      playground: playgrounds[playground],
    });
  }, [playground]);

  const outputRef1 = useRef<IFrameHandle>(null);

  const consoleFeedIframeGlueScript = useMemo(() => iframeGlueScriptConstructor(process.env.NEXT_PUBLIC_SITE_URL!), []);

  const [html, setHTML] = useState<string>(defaultHTML);
  const [css, setCSS] = useState<string>(defaultCSS);
  const [js, setJS] = useState<string>(defaultJS);

  const content = useMemo(() => {
    if (!html && !css && !js) {
      return { html: defaultHTML, css: defaultCSS, js: defaultJS };
    }
    return { html, css, js:jsValidator(js) };
  }, [html, css, js]);

  return (
    <div
      className={cn(
        'bg-[#ffffff] flex flex-col  dark:bg-[#161b22] rounded border\
                 border-[#cccccc] dark:border-[#30363d]',
      )}
    >
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-w-[1000px] min-h-[600px] max-w-md rounded-none border md:min-w-[1200px]"
      >
        <ResizablePanel defaultSize="50%">
          <Tabs defaultValue={tabs.left.active} className="size-full flex-col  my-0 rounded-none">
            <div className={cn('select-none flex justify-between items-center')}>
              <div className="flex flex-wrap">
                <TabsList>
                  <TabsTrigger hidden={!tabs.left.items.html} value="html">
                    HTML
                  </TabsTrigger>
                  <TabsTrigger hidden={!tabs.left.items.css} value="css">
                    CSS
                  </TabsTrigger>
                  <TabsTrigger hidden={!tabs.left.items.js} value="js">
                    JavaScript
                  </TabsTrigger>
                </TabsList>
              </div>

              {
                <div className="flex child-[*]:mx-2">
                  <ButtonGroup>
                    <Button    onClick={() => exportContent(content)} variant="outline">
                      <FiDownload />
                    </Button>
                    <Button   onClick={() => setAutoRun((value) => !value)} variant="outline">
                      <AiOutlineSync />
                    </Button>
                    <Button onClick={() => outputRef1.current!.reload()} variant="outline">
                      <FiPlay />
                    </Button>
                  </ButtonGroup>
                </div>
              }
            </div>

            <TabsContent className={cn('size-full p-1')} value="html">
              <CodeMirrorWrapper
                className="flex-one size-full"
                extensions={[cmHTML()]}
                value={html}
                onChange={(value) => setHTML(value)}
              />
            </TabsContent>
            <TabsContent className={cn('size-full p-1')}  value="css">
              {' '} 
              <CodeMirrorWrapper
                className="flex-one size-full"
                extensions={[cmCSS()]}
                value={css}
                onChange={(value) => setCSS(value)}
              />
            </TabsContent>
            <TabsContent className={cn('size-full p-1')}  value="js">
              {' '}
              <CodeMirrorWrapper
                className="flex-one size-full"
                extensions={[cmJS()]}
                value={js}
                onChange={(value) => setJS(value)}
              />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="50%">
          <Tabs defaultValue={tabs.right.active} className="size-full flex-col my-0 rounded-none">
            <TabsList>
              <TabsTrigger hidden={!tabs.right.items.output} value="output">
                Output
              </TabsTrigger>
              <TabsTrigger hidden={!tabs.right.items.console} value="console">
                Console
              </TabsTrigger>
            </TabsList>
            <TabsContent className={cn('size-full')}  value="output">
              <IFrame
                ref={outputRef1}
                name="output"
                width="100%"
                title="Output"
                content={content}
                preScript={consoleFeedIframeGlueScript}
                disabled={!autoRun}
              />
            </TabsContent>
            <TabsContent className={cn('size-full')}  value="console">
    <Console className="flex-one size-full"   iframe={outputRef1.current!?.element} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

function reducer<T extends Playgrounds['js'] | Playgrounds['web']>(
  state: T,
  action: { type: 'CHANGE_PLAYGROUND'; playground: T } | { type: 'ACTIVATE_TAB'; group: 'left' | 'right'; id: string },
) {
  switch (action.type) {
    case 'CHANGE_PLAYGROUND': {
      console.log('Changing playground to', action.playground);
      // if(state.left.active === action.playground) {
      //   return state;
      // }
      return action.playground;
    }
    case 'ACTIVATE_TAB': {
      return {
        ...state,
        [action.group]: { ...state[action.group], active: action.id },
      };
    }
    default: {
      return state;
    }
  }
}

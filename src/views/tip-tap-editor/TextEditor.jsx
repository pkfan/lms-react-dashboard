import './helper/windowDomVariablesAndMethodsInit';
import imageUploadOnPaste from '../../helpers/imageUploadOnPaste';

import { useState, useEffect, useRef } from 'react';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';

import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import FontFamily from '@tiptap/extension-font-family';
import Text from '@tiptap/extension-text';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';

import './style/tableStyle.scss';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import FontSize from 'tiptap-extension-font-size';
import History from '@tiptap/extension-history';

import './style/focusStyle.scss';
import Focus from '@tiptap/extension-focus';

import {
  Box,
  Menu,
  Slider,
  Flex,
  Text as MantineText,
  Modal,
  Tabs,
  Image as MantineImage,
  Button as MantineButton,
} from '@mantine/core';
import Button from '@/components/common/Button';
import { BsFillImageFill } from 'react-icons/bs';
import { FaTable, FaRedo, FaUndo, FaSave } from 'react-icons/fa';

import { RiCodeBoxFill } from 'react-icons/ri';
import { AiFillHtml5 } from 'react-icons/ai';
import { BiFontFamily, BiFontSize } from 'react-icons/bi';

import {
  showLoadingNotification,
  updateLoadingNotificationError,
  updateLoadingNotificationSuccess,
} from '@/helpers/notification';

import createImageUrl from '@/helpers/createImageUrl';

// import Image from './ImageResize';
import TipTapImageExtend from './TipTapImageExtend';
import inlineStyleConversion from './helper/inlineStyleConversion';
import changeTipTapCurrentImageStyle from './helper/changeTipTapCurrentImageStyle';

// codeblock extenstions imports
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import './style/codeBlockStyle.scss';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
// import ImageGallary from './ImageGallary';
import { ImageGallary } from '@/components';

// codeblock
lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

// const content = `<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>
// <div id='math-test'>testing equation</div>
// <table>
//           <tbody>
//             <tr>
//               <th>Name</th>
//               <th colspan="3">Description</th>
//             </tr>
//             <tr>
//               <td>Cyndi Lauper</td>
//               <td>singer</td>
//               <td>songwriter</td>
//               <td>actress</td>
//             </tr>
//           </tbody>
//         </table>
// {
//   if (i % 15 == 0)
//     console.log("FizzBuzz");
//   else if (i % 3 == 0)
//     console.log("Fizz");
//   else if (i % 5 == 0)
//     console.log("Buzz");
//   else
//     console.log(i);
// }</code></pre>
//         <p>
//           Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
//         </p>

//         <p><span style="font-family: Inter">Did you know that Inter is a really nice font for interfaces?</span></p>
//         <p><span style="font-family: Comic Sans MS, Comic Sans">It doesn’t look as professional as Comic Sans.</span></p>
//         <p><span style="font-family: serif">Serious people use serif fonts anyway.</span></p>
//         <p><span style="font-family: monospace">The cool kids can apply monospace fonts aswell.</span></p>
//         <p><span style="font-family: cursive">But hopefully we all can agree, that cursive fonts are the best.</span></p>
//   `;
export function TextEditor({
  content,
  setDescriptionHtml,
  savingDescription,
  saveButtonStyle,
  ...others
}) {
  const [changeImageWidthWithSlider, setChangeImageWidthWithSlider] = useState(50);
  const [openGallary, setOpenGallary] = useState(false);
  /////////

  const [bodyPictureAdded, setBodyPictureAdded] = useState({ file: null });
  const [bodyPictureSuccess, setBodyPictureSuccess] = useState({ response: null });
  const [bodyPictureError, setBodyPictureError] = useState({ response: null });

  // useEffect(() => {
  //   imageUploadOnPaste({
  //     onAdded: setBodyPictureAdded,
  //     onSuccess: setBodyPictureSuccess,
  //     onError: setBodyPictureError,
  //   });
  // }, []);

  // useEffect(() => {
  //   //   bodyPictureAdded, setBodyPictureAdded] = useState({ file: null });
  //   // const [bodyPictureSuccess, setBodyPictureSuccess] = useState({ response: null });

  //   // const url = `${config.domainUrl}/${profilePictureSuccess.response.directory}/${profilePictureSuccess.response.file_name}.webp`;
  //   // console.log('url :', url);
  //   if (bodyPictureAdded.file && !(bodyPictureSuccess.response || bodyPictureError.response)) {
  //     console.log(' if (bodyPictureAdded.file && !(bodyPictureSuccess.response || bodyP');
  //     showLoadingNotification({
  //       id: 'bodyPicture',
  //       title: 'Uploading Image...',
  //       message: 'Uloading image to server and then will add.',
  //     });
  //   } else if (bodyPictureSuccess.response) {
  //     const imageUrl = createImageUrl(bodyPictureSuccess.response.data);
  //     console.log('createImageUrl error trace :', imageUrl);

  //     addImageToTipTapDomEditorViaBody(imageUrl);

  //     updateLoadingNotificationSuccess({
  //       id: 'bodyPicture',
  //       title: 'Image Uploaded and added.',
  //       message: 'Your image uploaded successfully',
  //       time: 2000,
  //     });
  //     setBodyPictureSuccess({ response: null });
  //     setOpenGallary(false);
  //   } else if (bodyPictureError.response) {
  //     updateLoadingNotificationError({
  //       id: 'bodyPicture',
  //       title: 'Failed',
  //       message: bodyPictureError.response.message,
  //       time: 4000,
  //     });
  //     setBodyPictureError({ response: null });
  //   }
  // }, [bodyPictureSuccess, bodyPictureError, bodyPictureAdded]);

  const editor = useEditor({
    extensions: [
      TipTapImageExtend,
      StarterKit.configure({
        codeBlock: false,
        text: false,
        history: false,
      }),

      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      FontFamily,
      Text,
      TextStyle,
      Color,

      Table.configure({ resizable: true }),
      TableCell,
      TableHeader,
      TableRow,
      FontSize,
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      History,
    ],
    content, // initial data
    autofocus: true,
  });

  if (!editor) {
    return null;
  }

  //   const insertContentHtml = () => {
  //     editor.commands.insertContent(`<math display='block'>
  //  <semantics>
  //   <mrow>
  //    <mrow><mo>[</mo> <mrow>
  //     <mi>f</mi><mi>d</mi><mi>s</mi><mi>a</mi>
  //    </mrow> <mo>]</mo></mrow><mi>h</mi><mstyle displaystyle='true'>
  //     <mo>&#x2211;</mo> <mrow>
  //      <mi>s</mi><mi>d</mi><mi>a</mi><mi>f</mi><mi>d</mi><mi>s</mi><mi>a</mi>
  //     </mrow>
  //    </mstyle><mo>&#x2264;</mo><mo>&#x2202;</mo><mo>&#x2192;</mo><mi>&#x03C0;</mi><mi>&#x03B8;</mi>
  //   </mrow>
  //   <annotation encoding='MathType-MTEF'>MathType@MTEF@5@5@+=feaagCart1ev2aaatCvAUfeBSjuyZL2yd9gzLbvyNv2CaerbuLwBLnhiov2DGi1BTfMBaeXatLxBI9gBaerbd9wDYLwzYbItLDharqqr1ngBPrgifHhDYfgasaacH8srps0lbbf9q8WrFfeuY=Hhbbf9v8qqaqFr0xc9pk0xbba9q8WqFfea0=yr0RYxir=Jbba9q8aq0=yq=He9q8qqQ8frFve9Fve9Ff0dmeaabaqaciGacaGaaeqabaWaaeaaeaaakeaadaWadaqaaiaadAgacaWGKbGaam4CaiaadggaaiaawUfacaGLDbaacaWGObWaaabqaeaacaWGZbGaamizaiaadggacaWGMbGaamizaiaadohacaWGHbaaleqabeqdcqGHris5aOGaeyizImQaeyOaIyRaeyOKH4QaeqiWdaNaeqiUdehaaa@4F4C@</annotation>
  //  </semantics>
  // </math>
  // `);
  //     let test = editor.commands;
  //     console.log('insertContentHtml focus', test);
  //   };

  // function addImageToTipTapDomEditorViaBody(imageUrl) {
  //   // setURL(imageUrl);
  //   editor
  //     .chain()
  //     .focus()
  //     .setImage({
  //       src: imageUrl,
  //       alt: 'lms',
  //       //   style: 'display:flex;width:500px;margin:auto;',
  //       style: inlineStyleConversion({ display: 'flex', margin: '16px auto 16px auto' }),
  //     })
  //     .run();
  // }

  const setImageDeta = ({ imageUrl }) => {
    // setURL(imageUrl);
    if (imageUrl) {
      setOpenGallary(false);
      //   editor.chain().focus().setImage({ src: url, alt: 'pkfan amir working', width: 200 }).run();
      editor
        .chain()
        .focus()
        .setImage({
          src: imageUrl,
          alt: 'lms',
          //   style: 'display:flex;width:500px;margin:auto;',
          style: inlineStyleConversion({ display: 'flex', margin: '16px auto 16px auto' }),
        })
        .run();
    }
  };

  const getFinalHtmlCode = () => {
    const html = editor.getHTML();
    console.log('html : ', html);
    setDescriptionHtml(html);
  };
  const onClickChangeImageHandle = (value) => {
    // return if invalid window global image object
    if (!window.tipTapImageAttributeCurrentNode) {
      return;
    }

    window.tipTapImageAttributeCurrentNode.setAttribute('width', `${value}%`);
    setChangeImageWidthWithSlider(value);
  };

  return (
    <Box {...others}>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <Box sx={{ display: 'inline' }}>
              <Menu shadow="md" withArrow arrowPosition="center">
                <Menu.Target>
                  <MantineButton
                    compact
                    sx={(theme) => ({
                      backgroundImage: `linear-gradient(${theme.colors.lmsLayout[0]}, ${theme.colors.lmsLayout[3]})`,

                      textTransform: 'uppercase',

                      '&:hover': {
                        backgroundImage: `linear-gradient(${theme.colors.lmsLayout[3]}, ${theme.colors.lmsLayout[0]})`,
                      },
                    })}
                    variant="outline"
                    component="div"
                    color="lmsLayout"
                  >
                    <BiFontFamily size={16} />
                  </MantineButton>
                </Menu.Target>

                <Menu.Dropdown sx={{ '& .mantine-Menu-item': { padding: '3px 12px!important' } }}>
                  <Menu.Item onClick={() => editor.chain().focus().setFontFamily('Inter').run()}>
                    <MantineText sx={{ fontFamily: 'Inter' }}>Inter</MantineText>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()
                    }
                  >
                    <MantineText sx={{ fontFamily: 'Comic Sans MS, Comic Sans' }}>
                      Comic Sans
                    </MantineText>
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontFamily('serif').run()}>
                    <MantineText sx={{ fontFamily: 'serif' }}>Serif</MantineText>
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => editor.chain().focus().setFontFamily('monospace').run()}
                  >
                    <MantineText sx={{ fontFamily: 'monospace' }}>Monospace</MantineText>
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontFamily('cursive').run()}>
                    <MantineText sx={{ fontFamily: 'cursive' }}>Cursive</MantineText>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
            <Box sx={{ display: 'inline' }}>
              <Menu shadow="md" withArrow arrowPosition="center">
                <Menu.Target>
                  <MantineButton
                    compact
                    sx={(theme) => ({
                      backgroundImage: `linear-gradient(${theme.colors.lmsLayout[0]}, ${theme.colors.lmsLayout[3]})`,

                      textTransform: 'uppercase',

                      '&:hover': {
                        backgroundImage: `linear-gradient(${theme.colors.lmsLayout[3]}, ${theme.colors.lmsLayout[0]})`,
                      },
                    })}
                    variant="outline"
                    component="div"
                    color="lmsLayout"
                  >
                    <BiFontSize size={16} />
                  </MantineButton>
                </Menu.Target>

                <Menu.Dropdown sx={{ '& .mantine-Menu-item': { padding: '3px 12px!important' } }}>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('8pt').run()}>
                    8
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('9pt').run()}>
                    9
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('10pt').run()}>
                    10
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('11pt').run()}>
                    11
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('12pt').run()}>
                    12
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('14pt').run()}>
                    14
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('16pt').run()}>
                    16
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('18pt').run()}>
                    18
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('20pt').run()}>
                    20
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('22pt').run()}>
                    22
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('24pt').run()}>
                    24
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('28pt').run()}>
                    28
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('36pt').run()}>
                    36
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('48pt').run()}>
                    48
                  </Menu.Item>
                  <Menu.Item onClick={() => editor.chain().focus().setFontSize('72pt').run()}>
                    72
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>

            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <MantineButton
              compact
              variant="outline"
              color="lmsLayout"
              radius="xs"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              <RiCodeBoxFill size={16} />
            </MantineButton>
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <MantineButton
              compact
              variant="outline"
              color="lmsLayout"
              radius="xs"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              <FaUndo size={16} />
            </MantineButton>
            <MantineButton
              compact
              variant="outline"
              color="lmsLayout"
              radius="xs"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
              <FaRedo size={16} />
            </MantineButton>
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <>
              <Box sx={{ display: 'inline' }}>
                <Menu shadow="md" withArrow arrowPosition="center">
                  <Menu.Target>
                    <MantineButton
                      compact
                      sx={(theme) => ({
                        backgroundImage: `linear-gradient(${theme.colors.lmsLayout[0]}, ${theme.colors.lmsLayout[3]})`,

                        textTransform: 'uppercase',

                        '&:hover': {
                          backgroundImage: `linear-gradient(${theme.colors.lmsLayout[3]}, ${theme.colors.lmsLayout[0]})`,
                        },
                      })}
                      variant="outline"
                      component="div"
                      color="lmsLayout"
                    >
                      <FaTable size={16} />
                    </MantineButton>
                  </Menu.Target>

                  <Menu.Dropdown sx={{ '& .mantine-Menu-item': { padding: '3px 12px!important' } }}>
                    <Menu.Item
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                          .run()
                      }
                    >
                      Insert Table
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().deleteTable().run()}>
                      Delete Table
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().fixTables().run()}>
                      Fix Tables
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={() => editor.chain().focus().addColumnBefore().run()}>
                      Add Column Before
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().addColumnAfter().run()}>
                      Add Column After
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().deleteColumn().run()}>
                      Delete Column
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={() => editor.chain().focus().addRowBefore().run()}>
                      Add Row Before
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().addRowAfter().run()}>
                      Add Row After
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().deleteRow().run()}>
                      Delete Row
                    </Menu.Item>
                    <Menu.Divider />

                    <Menu.Item onClick={() => editor.chain().focus().mergeCells().run()}>
                      Merge Cells
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().splitCell().run()}>
                      Split Cell
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>
                      Toggle Header Column
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().toggleHeaderRow().run()}>
                      Toggle Header Row
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                      Toggle Header Cell
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={() => editor.chain().focus().mergeOrSplit().run()}>
                      Merge Or Split
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}
                    >
                      Set Cell Attribute
                    </Menu.Item>
                    <Menu.Divider />

                    <Menu.Item onClick={() => editor.chain().focus().goToNextCell().run()}>
                      Go To Next Cell
                    </Menu.Item>
                    <Menu.Item onClick={() => editor.chain().focus().goToPreviousCell().run()}>
                      Go To Previous Cell
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Box>
            </>
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
          {/* <RichTextEditor.Image /> */}

          <Box sx={{ display: 'inline' }}>
            <Menu shadow="md" width={100} withArrow arrowPosition="center">
              <Menu.Target>
                <MantineButton
                  compact
                  sx={(theme) => ({
                    backgroundImage: `linear-gradient(${theme.colors.lmsLayout[0]}, ${theme.colors.lmsLayout[3]})`,

                    textTransform: 'uppercase',

                    '&:hover': {
                      backgroundImage: `linear-gradient(${theme.colors.lmsLayout[3]}, ${theme.colors.lmsLayout[0]})`,
                    },
                  })}
                  variant="outline"
                  component="div"
                  color="lmsLayout"
                >
                  <BsFillImageFill size={16} />
                </MantineButton>
              </Menu.Target>

              <Menu.Dropdown sx={{ '& .mantine-Menu-item': { padding: '3px 12px!important' } }}>
                <Menu.Item
                  onClick={() => {
                    setOpenGallary(true);
                  }}
                >
                  Gallary
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={() => {
                    changeTipTapCurrentImageStyle({ margin: '16px auto' });
                  }}
                >
                  Center
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    changeTipTapCurrentImageStyle({ margin: '16px auto 16px 0' });
                  }}
                >
                  Left
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    changeTipTapCurrentImageStyle({ margin: '16px 0 16px auto' });
                  }}
                >
                  Right
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
          <Flex
            direction="column"
            gap={3}
            jutify="center"
            align="center"
            sx={{ transform: 'translateY(8px)' }}
          >
            <Slider
              sx={{ width: 150 }}
              size="xs"
              thumbSize={16}
              value={changeImageWidthWithSlider}
              onChange={onClickChangeImageHandle}
              min={1}
              max={100}
            />
            <MantineText sx={{ fontWeight: 'bolder', fontSize: 12 }}>Resize Image</MantineText>
          </Flex>

          <Button
            onClick={getFinalHtmlCode}
            sx={saveButtonStyle}
            compact
            color="lmsLayout"
            loading={savingDescription}
            leftIcon={<FaSave size={16} />}
          >
            save
          </Button>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
      <ImageGallary
        openGallary={openGallary}
        setOpenGallary={setOpenGallary}
        setImageDeta={setImageDeta}
        imageUploadRelativeUrl="/body-image"
        forTextEditor={true}
        enableExternalLink={true}
      />
    </Box>
  );
}

export default TextEditor;

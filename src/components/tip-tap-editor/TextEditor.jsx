import './helper/windowDomVariablesAndMethodsInit';
import { useState } from 'react';
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

import './tableStyle.scss';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';

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
import { BsFillImageFill } from 'react-icons/bs';
import { FaImages, FaExternalLinkAlt, FaTable } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { IconPhoto } from '@tabler/icons';
import { RiCodeBoxFill } from 'react-icons/ri';
import { BiFontFamily } from 'react-icons/bi';
// import Image from './ImageResize';
import TipTapImageExtend from './TipTapImageExtend';
import inlineStyleConversion from './helper/inlineStyleConversion';
import changeTipTapCurrentImageStyle from './helper/changeTipTapCurrentImageStyle';

// codeblock extenstions imports
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { lowlight } from 'lowlight';
import './codeBlockStyle.scss';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

// codeblock
lowlight.registerLanguage('html', html);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('js', js);
lowlight.registerLanguage('ts', ts);

const imageUrls = [
  'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
  'https://lh3.googleusercontent.com/-E4N22M-wKb4/YJaQ3X2ZsgI/AAAAAAAABBQ/0x2Q-XOVoV0tgBshHaRsiBILWlj2m8mZwCEwYBhgLKvQEANjnvE18udQneQW-nitkZI-KSZgYSyVsnax1B-QowgmlC_5ODtV47qDhsPqtPsdZ1IhTBLBYD6Ab49OdVOUcdT4JRoC-NXaE1-e8leT-zHpB14BZLi7UrM2cWf9o-XjJO5ZPZKBIo2sIZ4_4DJqpRpPNuQxX5vti9znigrGb6RxHaXrpzgPpXv_k_2_2x04UGYmQI_c8Py5OVTrVeWjpBKJqP6mnFtpRs8nzRR0vlOspoAQ1yt9tfGw-GKQam875kJQnes3gFj002H0F3ktH4wSpkiCvwAGXybRuP0H_4iTS45w9EnVvJ6Sfxq7wyF-g75HKqxXbSrpuSMR4Htg_p5OchCMZFWd5-8yXRJhqfUEn-0MM-_WSt63FCA82GoGidOhK__EUAYKj3xx0xEUPtu7dIUGRXGpzOXXdvRET3xO9Jy1Mswru9LXlYU4bWxf75urVyrO80sR10tqkuKS4Uag9N2vnuRCgJSDxtOTVK_nYDrk7KIb4xedcfXcDbTPYSZGrSTxciU87j6veD5PhFgqoR0XeyRUXDFkPIeW9I91Zxjl7Kw_XXMrSdApeXfMZLOQhLpRUPDOKiaEZVenkWN4D-726gxt6JHwQ0zHgJqHnocjNnyUCMOeKCEEdIuzu2mT5-XcCI9ineAjZBIHiF_sxYOFDO_-YnzWAnohDDN7RkRod6KcrSpWe_EZrSrxH8W4tB10jdiqJXo_qzUdqT8azUzqjK0ylyPUgsDUbzz6xxmW-_hbJl1slSotBcNyAhb5w-737Q4hFfBAKtlJSgpczW8mpUFGzUICLh0VAxg57Tqk7nf6cXmd3Tu_qRgx_lBHNSDC0-9ifBg/w140-h125-p/cs506.jpg',
  'https://lh3.googleusercontent.com/-Bn7bdg68Cv8/YJaSWMvKMoI/AAAAAAAABBY/A1MxdF_BMJkpH90CoE5M47X3dJyqRujkwCEwYBhgLKvQEANjnvE18udQneQW-nitkZI-KSZgYSyVsnax1B-QowgmlC_5ODtV47qDhsPqtPsdZ1IhTBLBYD6Ab49OdVOUcdT4JRoC-NXaE1-e8leT-zHpB14BZLi7UrM2cWf9o-XjJO5ZPZKBIo2sIZ4_4DJqpRpPNuQxX5vti9znigrGb6RxHaXrpzgPpXv_k_2_2x04UGYmQI_c8Py5OVTrVeWjpBKJqP6mnFtpRs8nzRR0vlOspoAQ1yt9tfGw-GKQam875kJQnes3gFj002H0F3ktH4wSpkiCvwAGXybRuP0H_4iTS45w9EnVvJ6Sfxq7wyF-g75HKqxXbSrpuSMR4Htg_p5OchCMZFWd5-8yXRJhqfUEn-0MM-_WSt63FCA82GoGidOhK__EUAYKj3xx0xEUPtu7dIUGRXGpzOXXdvRET3xO9Jy1Mswru9LXlYU4bWxf75urVyrO80sR10tqkuKS4Uag9N2vnuRCgJSDxtOTVK_nYDrk7KIb4xedcfXcDbTPYSZGrSTxciU87j6veD5PhFgqoR0XeyRUXDFkPIeW9I91Zxjl7Kw_XXMrSdApeXfMZLOQhLpRUPDOKiaEZVenkWN4D-726gxt6JHwQ0zHgJqHnocjNnyUCMOeKCEEdIuzu2mT5-XcCI9ineAjZBIHiF_sxYOFDO_-YnzWAnohDDN7RkRod6KcrSpWe_EZrSrxH8W4tB10jdiqJXo_qzUdqT8azUzqjK0ylyPUgsDUbzz6xxmW-_hbJl1slSotBcNyAhb5w-737Q4hFfBAKtlJSgpczW8mpUFGzUICLh0VAxg57Tqk7nf6cXmd3Tu_qRgx_lBHNSDC0-9ifBg/w140-h85-p/cs202.jpg',
  'https://lh3.googleusercontent.com/-XYmoaNb97C0/YzBwU94pHhI/AAAAAAAABIA/Wlpj0gUkKtcGm1OgDmUfeCmNFsJv9MQnACEwYBhgLKvQEANjnvE18udQneQW-nitkZI-KSZgYSyVsnax1B-QowgmlC_5ODtV47qDhsPqtPsdZ1IhTBLBYD6Ab49OdVOUcdT4JRoC-NXaE1-e8leT-zHpB14BZLi7UrM2cWf9o-XjJO5ZPZKBIo2sIZ4_4DJqpRpPNuQxX5vti9znigrGb6RxHaXrpzgPpXv_k_2_2x04UGYmQI_c8Py5OVTrVeWjpBKJqP6mnFtpRs8nzRR0vlOspoAQ1yt9tfGw-GKQam875kJQnes3gFj002H0F3ktH4wSpkiCvwAGXybRuP0H_4iTS45w9EnVvJ6Sfxq7wyF-g75HKqxXbSrpuSMR4Htg_p5OchCMZFWd5-8yXRJhqfUEn-0MM-_WSt63FCA82GoGidOhK__EUAYKj3xx0xEUPtu7dIUGRXGpzOXXdvRET3xO9Jy1Mswru9LXlYU4bWxf75urVyrO80sR10tqkuKS4Uag9N2vnuRCgJSDxtOTVK_nYDrk7KIb4xedcfXcDbTPYSZGrSTxciU87j6veD5PhFgqoR0XeyRUXDFkPIeW9I91Zxjl7Kw_XXMrSdApeXfMZLOQhLpRUPDOKiaEZVenkWN4D-726gxt6JHwQ0zHgJqHnocjNnyUCMOeKCEEdIuzu2mT5-XcCI9ineAjZBIHiF_sxYOFDO_-YnzWAnohDDN7RkRod6KcrSpWe_EZrSrxH8W4tB10jdiqJXo_qzUdqT8azUzqjK0ylyPUgsDUbzz6xxmW-_hbJl1slSotBcNyAhb5w-737Q4hFfBAKtlJSgpczW8mpUFGzUICLh0VAxg57Tqk7nf6cXmd3Tu_qRgx_lBHNSDC0-9ifBg/w115-h140-p/Picture1.png',
  'https://lh3.googleusercontent.com/-_qdHVlZiLKU/YzBwVDV1UuI/AAAAAAAABII/hGFkDq8HYWUhk4mnxegOE2f7N2Tepy6eQCEwYBhgLKvQEANjnvE18udQneQW-nitkZI-KSZgYSyVsnax1B-QowgmlC_5ODtV47qDhsPqtPsdZ1IhTBLBYD6Ab49OdVOUcdT4JRoC-NXaE1-e8leT-zHpB14BZLi7UrM2cWf9o-XjJO5ZPZKBIo2sIZ4_4DJqpRpPNuQxX5vti9znigrGb6RxHaXrpzgPpXv_k_2_2x04UGYmQI_c8Py5OVTrVeWjpBKJqP6mnFtpRs8nzRR0vlOspoAQ1yt9tfGw-GKQam875kJQnes3gFj002H0F3ktH4wSpkiCvwAGXybRuP0H_4iTS45w9EnVvJ6Sfxq7wyF-g75HKqxXbSrpuSMR4Htg_p5OchCMZFWd5-8yXRJhqfUEn-0MM-_WSt63FCA82GoGidOhK__EUAYKj3xx0xEUPtu7dIUGRXGpzOXXdvRET3xO9Jy1Mswru9LXlYU4bWxf75urVyrO80sR10tqkuKS4Uag9N2vnuRCgJSDxtOTVK_nYDrk7KIb4xedcfXcDbTPYSZGrSTxciU87j6veD5PhFgqoR0XeyRUXDFkPIeW9I91Zxjl7Kw_XXMrSdApeXfMZLOQhLpRUPDOKiaEZVenkWN4D-726gxt6JHwQ0zHgJqHnocjNnyUCMOeKCEEdIuzu2mT5-XcCI9ineAjZBIHiF_sxYOFDO_-YnzWAnohDDN7RkRod6KcrSpWe_EZrSrxH8W4tB10jdiqJXo_qzUdqT8azUzqjK0ylyPUgsDUbzz6xxmW-_hbJl1slSotBcNyAhb5w-737Q4hFfBAKtlJSgpczW8mpUFGzUICLh0VAxg57Tqk7nf6cXmd3Tu_qRgx_lBHNSDC0-9ifBg/w32-h140-p/HomePage.png',
  'https://lh3.googleusercontent.com/-YVEJgipOQLc/YzBwVhIY6xI/AAAAAAAABII/_kTeCWnCK4QR5HYO3AuECGBur9AZvvstwCEwYBhgLKvQEANjnvE18udQneQW-nitkZI-KSZgYSyVsnax1B-QowgmlC_5ODtV47qDhsPqtPsdZ1IhTBLBYD6Ab49OdVOUcdT4JRoC-NXaE1-e8leT-zHpB14BZLi7UrM2cWf9o-XjJO5ZPZKBIo2sIZ4_4DJqpRpPNuQxX5vti9znigrGb6RxHaXrpzgPpXv_k_2_2x04UGYmQI_c8Py5OVTrVeWjpBKJqP6mnFtpRs8nzRR0vlOspoAQ1yt9tfGw-GKQam875kJQnes3gFj002H0F3ktH4wSpkiCvwAGXybRuP0H_4iTS45w9EnVvJ6Sfxq7wyF-g75HKqxXbSrpuSMR4Htg_p5OchCMZFWd5-8yXRJhqfUEn-0MM-_WSt63FCA82GoGidOhK__EUAYKj3xx0xEUPtu7dIUGRXGpzOXXdvRET3xO9Jy1Mswru9LXlYU4bWxf75urVyrO80sR10tqkuKS4Uag9N2vnuRCgJSDxtOTVK_nYDrk7KIb4xedcfXcDbTPYSZGrSTxciU87j6veD5PhFgqoR0XeyRUXDFkPIeW9I91Zxjl7Kw_XXMrSdApeXfMZLOQhLpRUPDOKiaEZVenkWN4D-726gxt6JHwQ0zHgJqHnocjNnyUCMOeKCEEdIuzu2mT5-XcCI9ineAjZBIHiF_sxYOFDO_-YnzWAnohDDN7RkRod6KcrSpWe_EZrSrxH8W4tB10jdiqJXo_qzUdqT8azUzqjK0ylyPUgsDUbzz6xxmW-_hbJl1slSotBcNyAhb5w-737Q4hFfBAKtlJSgpczW8mpUFGzUICLh0VAxg57Tqk7nf6cXmd3Tu_qRgx_lBHNSDC0-9ifBg/w140-h118-p/Picture3.png',
];

const content = `<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>
<table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colspan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>singer</td>
              <td>songwriter</td>
              <td>actress</td>
            </tr>
          </tbody>
        </table>
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code></pre>
        <p>
          Press Command/Ctrl + Enter to leave the fenced code block and continue typing in boring paragraphs.
        </p>

        <p><span style="font-family: Inter">Did you know that Inter is a really nice font for interfaces?</span></p>
        <p><span style="font-family: Comic Sans MS, Comic Sans">It doesn’t look as professional as Comic Sans.</span></p>
        <p><span style="font-family: serif">Serious people use serif fonts anyway.</span></p>
        <p><span style="font-family: monospace">The cool kids can apply monospace fonts aswell.</span></p>
        <p><span style="font-family: cursive">But hopefully we all can agree, that cursive fonts are the best.</span></p>
  `;
export function TextEditor() {
  const [changeImageWidthWithSlider, setChangeImageWidthWithSlider] = useState(50);
  const [openGallary, setOpenGallary] = useState(false);

  const editor = useEditor({
    extensions: [
      TipTapImageExtend,
      StarterKit.configure({
        codeBlock: false,
        text: false,
      }),
      ,
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
    ],
    content,
  });

  const addImageToTipTapDomFromGallary = (imageUrl) => {
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

  if (!editor) {
    return null;
  }

  const onClickChangeImageHandle = (value) => {
    // return if invalid window global image object
    if (!window.tipTapImageAttributeCurrentNode) {
      return;
    }

    window.tipTapImageAttributeCurrentNode.setAttribute('width', `${value}%`);
    setChangeImageWidthWithSlider(value);
  };

  return (
    <>
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
            <RichTextEditor.Color />
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
              sx={{ width: 280 }}
              size="sm"
              thumbSize={20}
              value={changeImageWidthWithSlider}
              onChange={onClickChangeImageHandle}
              min={20}
              max={90}
            />
            <MantineText sx={{ fontWeight: 'bolder', fontSize: 12 }}>Resize Image</MantineText>
          </Flex>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>

      {openGallary && (
        <Modal
          size="calc(100vw - 87px)"
          opened={openGallary}
          onClose={() => setOpenGallary(false)}
          title="Add Images"
        >
          <Tabs color="dark" variant="outline" radius="md" defaultValue="gallery">
            <Tabs.List>
              <Tabs.Tab value="gallery" icon={<FaImages size={16} />}>
                Gallery
              </Tabs.Tab>
              <Tabs.Tab value="thumbnail" icon={<IconPhoto size={16} />}>
                Thumbnails
              </Tabs.Tab>
              <Tabs.Tab value="upload" icon={<FiUpload size={16} />}>
                Upload
              </Tabs.Tab>
              <Tabs.Tab value="external" icon={<FaExternalLinkAlt size={16} />}>
                External Link
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="gallery" pt="xs">
              <Flex wrap="wrap" gap={8}>
                {imageUrls.map((url, index) => (
                  <MantineImage
                    key={index}
                    radius="sm"
                    src={url}
                    onClick={() => addImageToTipTapDomFromGallary(url)}
                    alt="lms pro"
                    width={200}
                    mah={200}
                    sx={{ overflow: 'hidden', cursor: 'pointer' }}
                  />
                ))}
              </Flex>
            </Tabs.Panel>

            <Tabs.Panel value="thumbnail" pt="xs">
              thumbnail tab content
            </Tabs.Panel>

            <Tabs.Panel value="upload" pt="xs">
              Settings tab content
            </Tabs.Panel>
            <Tabs.Panel value="external" pt="xs">
              Settings tab content
            </Tabs.Panel>
          </Tabs>
        </Modal>
      )}
    </>
  );
}

export default TextEditor;

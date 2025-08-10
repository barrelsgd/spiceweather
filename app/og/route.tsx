import { readFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

// Hoisted regex for performance per Biome suggestion
const FONT_SRC_RE = /src: url\((.+)\) format\('(opentype|truetype)'\)/;

const loadGoogleFont = async (font: string, text: string, weights: string) => {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weights}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(FONT_SRC_RE);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status === 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
};

export const GET = async (request: NextRequest) => {
  const title = request.nextUrl.searchParams.get('title');
  const description = request.nextUrl.searchParams.get('description');

  const avatarData = await readFile(
    join(process.cwd(), 'components/avatar/avatar.jpg')
  );
  const avatarBase64 = Buffer.from(avatarData).toString('base64');
  const avatarSrc = `data:image/jpeg;base64,${avatarBase64}`;

  return new ImageResponse(
    <div
      style={{
        backgroundSize: '80px 80px',
        backgroundImage:
          'linear-gradient(to right, #E5E5E5 1px, transparent 1px), linear-gradient(to bottom, #E5E5E5 1px, transparent 1px)',
      }}
      tw="flex flex-col justify-between items-start w-full h-full bg-[#F5F5F5] p-12"
    >
      {/* biome-ignore lint/performance/noImgElement: Next.js OG routes cannot use next/image */}
      <img
        alt="avatar"
        height={72}
        src={avatarSrc}
        tw="overflow-hidden rounded-full"
        width={72}
      />
      <div tw="flex flex-col">
        <h1 tw="max-w-[48rem] text-[64px] font-bold leading-[69px] tracking-tighter m-0">
          {title}
        </h1>
        {description && (
          <p tw="max-w-[30rem] text-[24px] font-normal leading-[32px] tracking-tight text-[#666666] mt-4 mb-0">
            {description}
          </p>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: await loadGoogleFont('Geist', title ?? '', '700'),
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Geist',
          data: await loadGoogleFont('Geist', description ?? '', '400'),
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
};

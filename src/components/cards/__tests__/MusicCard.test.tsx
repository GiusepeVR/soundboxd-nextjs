import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MusicCard from '@/components/cards/MusicCard';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }: any) => (
    <img src={src} alt={alt} {...(fill ? {} : props)} />
  ),
}));

describe('MusicCard Component', () => {
  const defaultProps = {
    id: 'test-id',
    title: 'Test Song',
    artist: 'Test Artist',
    imageUrl: 'https://example.com/image.jpg',
  };

  describe('Default Variant', () => {
    it('renders with default variant when no variant prop is provided', () => {
      render(<MusicCard {...defaultProps} />);

      expect(screen.getByText('Test Song')).toBeInTheDocument();
      expect(screen.getByText('Test Artist')).toBeInTheDocument();
    });

    it('renders with default variant when variant is explicitly set to default', () => {
      render(<MusicCard {...defaultProps} variant='default' />);

      expect(screen.getByText('Test Song')).toBeInTheDocument();
      expect(screen.getByText('Test Artist')).toBeInTheDocument();
    });

    it('displays the correct image with proper alt text', () => {
      render(<MusicCard {...defaultProps} />);

      const image = screen.getByAltText('Test Song by Test Artist');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('applies custom className when provided', () => {
      const { container } = render(
        <MusicCard {...defaultProps} className='custom-class' />
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('custom-class');
    });

    it('has proper CSS classes for default variant', () => {
      const { container } = render(<MusicCard {...defaultProps} />);

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass(
        'bg-white',
        'rounded-lg',
        'shadow-sm',
        'cursor-pointer'
      );
    });

    it('renders title and artist in separate elements', () => {
      render(<MusicCard {...defaultProps} />);

      const titleElement = screen.getByText('Test Song');
      const artistElement = screen.getByText('Test Artist');

      expect(titleElement.tagName).toBe('H3');
      expect(artistElement.tagName).toBe('P');
    });

    it('handles long titles and artists with truncation', () => {
      const longTitle =
        'This is a very long song title that should be truncated';
      const longArtist =
        'This is a very long artist name that should be truncated';

      render(
        <MusicCard {...defaultProps} title={longTitle} artist={longArtist} />
      );

      const titleElement = screen.getByText(longTitle);
      const artistElement = screen.getByText(longArtist);

      expect(titleElement).toHaveClass('truncate');
      expect(artistElement).toHaveClass('truncate');
    });
  });

  describe('Minimal Variant', () => {
    it('renders minimal variant when variant prop is set to minimal', () => {
      render(<MusicCard {...defaultProps} variant='minimal' />);

      expect(screen.getByText('Test Song')).toBeInTheDocument();
      expect(screen.getByText('Test Artist')).toBeInTheDocument();
    });

    it('displays the correct image with proper alt text in minimal variant', () => {
      render(<MusicCard {...defaultProps} variant='minimal' />);

      const image = screen.getByAltText('Test Song by Test Artist');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('applies custom className when provided in minimal variant', () => {
      const { container } = render(
        <MusicCard
          {...defaultProps}
          variant='minimal'
          className='custom-class'
        />
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('custom-class');
    });

    it('has proper CSS classes for minimal variant', () => {
      const { container } = render(
        <MusicCard {...defaultProps} variant='minimal' />
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('relative', 'group', 'cursor-pointer');
    });

    it('renders title and artist in overlay elements for minimal variant', () => {
      render(<MusicCard {...defaultProps} variant='minimal' />);

      const titleElement = screen.getByText('Test Song');
      const artistElement = screen.getByText('Test Artist');

      expect(titleElement.tagName).toBe('SPAN');
      expect(artistElement.tagName).toBe('SPAN');
    });

    it('has overlay with proper styling in minimal variant', () => {
      const { container } = render(
        <MusicCard {...defaultProps} variant='minimal' />
      );

      const overlayElement = container.querySelector(
        '.absolute.flex.flex-col.justify-end'
      );
      expect(overlayElement).toBeInTheDocument();
      expect(overlayElement).toHaveClass(
        'bg-black/60',
        'p-4',
        'w-full',
        'h-full'
      );
    });
  });

  describe('Props Validation', () => {
    it('requires all required props', () => {
      // This test ensures TypeScript compilation works correctly
      // In a real scenario, you might want to test runtime validation
      expect(() => {
        render(<MusicCard {...defaultProps} />);
      }).not.toThrow();
    });

    it('handles empty strings for title and artist', () => {
      render(<MusicCard {...defaultProps} title='' artist='' />);

      // When title and artist are empty, the alt text becomes " by "
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', ' by ');
    });

    it('handles special characters in title and artist', () => {
      const specialTitle = 'Song with "quotes" & symbols!';
      const specialArtist = 'Artist with émojis 🎵';

      render(
        <MusicCard
          {...defaultProps}
          title={specialTitle}
          artist={specialArtist}
        />
      );

      expect(screen.getByText(specialTitle)).toBeInTheDocument();
      expect(screen.getByText(specialArtist)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper alt text for images', () => {
      render(<MusicCard {...defaultProps} />);

      const image = screen.getByAltText('Test Song by Test Artist');
      expect(image).toBeInTheDocument();
    });

    it('has proper alt text for minimal variant', () => {
      render(<MusicCard {...defaultProps} variant='minimal' />);

      const image = screen.getByAltText('Test Song by Test Artist');
      expect(image).toBeInTheDocument();
    });

    it('has cursor pointer indicating interactivity', () => {
      const { container } = render(<MusicCard {...defaultProps} />);

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toHaveClass('cursor-pointer');
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined className gracefully', () => {
      const { container } = render(
        <MusicCard {...defaultProps} className={undefined as any} />
      );

      const cardElement = container.firstChild as HTMLElement;
      expect(cardElement).toBeInTheDocument();
    });

    it('handles very long image URLs', () => {
      const longImageUrl =
        'https://example.com/very/long/path/to/image/with/many/segments/that/might/cause/issues.jpg';

      render(<MusicCard {...defaultProps} imageUrl={longImageUrl} />);

      const image = screen.getByAltText('Test Song by Test Artist');
      expect(image).toHaveAttribute('src', longImageUrl);
    });

    it('handles numeric IDs', () => {
      render(<MusicCard {...defaultProps} id='12345' />);

      expect(screen.getByText('Test Song')).toBeInTheDocument();
      expect(screen.getByText('Test Artist')).toBeInTheDocument();
    });
  });
});

interface Experiment {
  slug: string;
  name: string;
  type: 'internal' | 'external';
  link: string;
  source: string;
  component: string | null;
  resolution: {
    width: number;
    height: number;
  }
}
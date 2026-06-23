import {
  type SerializedEditorState,
  type SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical";

export class Response {
  docs: Doc[] = [];
  totalDocs: number = 0;
  limit: number = 0;
  totalPages: number = 0;
  page: number = 0;
  pagingCounter: number = 0;
  hasPrevPage: boolean = false;
  hasNextPage: boolean = false;
  prevPage: any = null;
  nextPage: any = null;

  constructor(data?: Partial<Response>) {
    Object.assign(this, data);
    if (data?.docs) this.docs = data.docs.map((d) => new Doc(d));
  }
}

export class Doc {
  createdAt: string = "";
  updatedAt: string = "";
  blocks: Block[] = [];
  public: string = "";
  id: string = "";
  dense: boolean = false;

  constructor(data?: Partial<Doc>) {
    Object.assign(this, data);
    if (data?.blocks) this.blocks = data.blocks.map((b) => new Block(b));
  }
}

export class Block {
  blockType: string = "";
  Slide?: Slide[] = [];
  id: string = "";
  "Text English"?: SerializedEditorState<SerializedLexicalNode> | null = null;
  "Text Thai"?: SerializedEditorState<SerializedLexicalNode> | null = null;
  products?: Product[] = [];
  image: Media | null = null;
  images: { id: string; image: Media }[] = [];
  youtubeUrl?: string = "";
  title: string = "";
  title_th: string = "";
  description: SerializedEditorState<SerializedLexicalNode> | null = null;
  description_th: SerializedEditorState<SerializedLexicalNode> | null = null;
  url: string = "";
  dense: boolean = false;

  constructor(data?: Partial<Block>) {
    Object.assign(this, data);

    if (data?.Slide) this.Slide = data.Slide.map((s) => new Slide(s));
    if (data?.products)
      this.products = data.products.map((p) => new Product(p));
    if (data?.images)
      this.images = data.images.map((i) => ({
        ...i,
        image: new Media(i.image),
      }));
  }
}

export class Slide {
  Title: string = "";
  Description: SerializedEditorState<SerializedLexicalNode> | null = null;
  Image: Media | null = null;
  Link?: string = "";
  "Button Text": string = "";
  id: string = "";

  constructor(data?: Partial<Slide>) {
    Object.assign(this, data);
  }
}

export class CategoryItem {
  id: string = "";
  name: string = "";
  name_th: string = "";
  image: Media | null = null;
  link: string = "";

  constructor(data?: Partial<CategoryItem>) {
    Object.assign(this, data);
    if (data?.image) this.image = new Media(data.image);
  }
}

export class Category extends Block {
  categories: CategoryItem[] = [];

  constructor(data?: Partial<Category>) {
    super(data);
    Object.assign(this, data);
    this.categories = this.categories.map((c) => new CategoryItem(c));
  }
}

export class MobileApp extends Block {
  bg: Media | null = null;
  images_th: { id: string; image: Media }[] = [];

  constructor(data?: Partial<MobileApp>) {
    super(data);
    Object.assign(this, data);
    this.images_th = this.images_th.map((img) => ({
      id: img.id,
      image: new Media(img.image),
    }));
  }
}

/* ---------- Text English ---------- */

export class TextEnglish {
  root: Root3 = new Root3();

  constructor(data?: Partial<TextEnglish>) {
    Object.assign(this, data);
    if (data?.root) this.root = new Root3(data.root);
  }
}

export class Root3 {
  children: Children3[] = [];
  direction: any = null;
  format: string = "";
  indent: number = 0;
  type: string = "";
  version: number = 0;

  constructor(data?: Partial<Root3>) {
    Object.assign(this, data);
    if (data?.children)
      this.children = data.children.map((c) => new Children3(c));
  }
}

export class Children3 {
  children: Children4[] = [];
  direction: any = null;
  format: string = "";
  indent: number = 0;
  type: string = "";
  version: number = 0;
  textFormat: number = 0;
  textStyle: string = "";

  constructor(data?: Partial<Children3>) {
    Object.assign(this, data);
    if (data?.children)
      this.children = data.children.map((c) => new Children4(c));
  }
}

export class Children4 {
  detail: number = 0;
  format: number = 0;
  mode: string = "";
  style: string = "";
  text: string = "";
  type: string = "";
  version: number = 0;

  constructor(data?: Partial<Children4>) {
    Object.assign(this, data);
  }
}

/* ---------- Text Thai ---------- */

export class TextThai {
  root: Root4 = new Root4();

  constructor(data?: Partial<TextThai>) {
    Object.assign(this, data);
    if (data?.root) this.root = new Root4(data.root);
  }
}

export class Root4 {
  children: Children5[] = [];
  direction: any = null;
  format: string = "";
  indent: number = 0;
  type: string = "";
  version: number = 0;

  constructor(data?: Partial<Root4>) {
    Object.assign(this, data);
    if (data?.children)
      this.children = data.children.map((c) => new Children5(c));
  }
}

export class Children5 {
  children: Children6[] = [];
  direction: any = null;
  format: string = "";
  indent: number = 0;
  type: string = "";
  version: number = 0;
  textFormat: number = 0;
  textStyle: string = "";

  constructor(data?: Partial<Children5>) {
    Object.assign(this, data);
    if (data?.children)
      this.children = data.children.map((c) => new Children6(c));
  }
}

export class Children6 {
  detail: number = 0;
  format: number = 0;
  mode: string = "";
  style: string = "";
  text: string = "";
  type: string = "";
  version: number = 0;

  constructor(data?: Partial<Children6>) {
    Object.assign(this, data);
  }
}

/* ---------- Product ---------- */

export class Product {
  id: string = "";
  title: string = "";
  title_th: string = "";
  thumbnail: Media = new Media();
  bgColor: string = "";
  link: string = "#";

  constructor(data?: Partial<Product>) {
    Object.assign(this, data);
    if (data?.thumbnail) this.thumbnail = new Media(data.thumbnail);
  }
}

export class Media {
  createdAt: string = "";
  updatedAt: string = "";
  alt: string = "";
  firebaseURL: string = "";
  bucketPath: string = "";
  url: string = "";
  filename: string = "";
  mimeType: string = "";
  filesize: number = 0;
  width: number = 0;
  height: number = 0;
  focalX: number = 0;
  focalY: number = 0;
  id: string = "";
  thumbnailURL: string = "";
  smallURL: string = "";
  blurhash: string = "";

  constructor(data?: Partial<Media>) {
    Object.assign(this, data);
  }

  Get() {
    return {
      url: (small?: boolean) =>
        (small ? this.smallURL : this.firebaseURL) || this.firebaseURL,
    };
  }
}

export class Client {
  id: string = "";
  name: string = "";
  logo: Media = new Media();

  constructor(data?: Partial<Client>) {
    Object.assign(this, data);
  }
}

export class BlockClient extends Block {
  clients: Client[] = [];

  constructor(data?: Partial<BlockClient>) {
    super(data);
    if (data?.clients) this.clients = data.clients.map((c) => new Client(c));
  }
}

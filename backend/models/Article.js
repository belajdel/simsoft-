const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
  },
  author: {
    type: String,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    enum: ["ERP", "GMAO", "Cybersécurité", "Cloud", "Général"],
    default: "Général",
  },
  coverImage: {
    type: String,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Pre-validate middleware to generate slug from title if not provided
articleSchema.pre('validate', function(next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getPost } from '@/lib/blog';
import ArticleLayout from '@/components/ArticleLayout';
import { useLang } from '@/i18n/useLang';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { localized } = useLang();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    if (!post) navigate(localized('/blog'), { replace: true });
  }, [post, navigate, localized]);

  if (!post) return null;
  return <ArticleLayout post={post} />;
}

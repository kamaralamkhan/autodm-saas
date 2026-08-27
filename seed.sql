-- Minimal test data for local development

INSERT INTO public.users (id, instagram_id, access_token)
VALUES ('test-user-id', 'test-ig-id', 'MOCK_TOKEN')
ON CONFLICT DO NOTHING;

INSERT INTO public.automations (id, user_id, trigger_type, trigger_keywords, message_type, message_content, is_active)
VALUES ('test-auto-1', 'test-user-id', 'dm', 'test', 'text', 'Hello from mock mode!', true)
ON CONFLICT DO NOTHING;

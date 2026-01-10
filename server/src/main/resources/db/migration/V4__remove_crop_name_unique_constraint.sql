-- Remove unique constraint from crop name field to allow duplicate crop entries
ALTER TABLE crop DROP INDEX UKqf59x43y8j1ekbtj4occ8f7c9;

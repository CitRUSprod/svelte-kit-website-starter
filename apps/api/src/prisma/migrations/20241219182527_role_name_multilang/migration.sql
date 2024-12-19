/*
  Warnings:

  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- Rename the existing name column
ALTER TABLE "Role" RENAME COLUMN "name" TO "old_name";

-- Add the new JSONB column
ALTER TABLE "Role" ADD COLUMN "name" JSONB;

-- Update the data
UPDATE "Role" SET "name" = jsonb_build_object(
  'ru', CASE
    WHEN "old_name" = 'user' THEN 'Пользователь'
    WHEN "old_name" = 'admin' THEN 'Администратор'
    ELSE "old_name"
  END,
  'en', "old_name"
);

-- Make the new column required
ALTER TABLE "Role" ALTER COLUMN "name" SET NOT NULL;

-- Drop the old column
ALTER TABLE "Role" DROP COLUMN "old_name";

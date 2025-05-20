import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, User } from "lucide-react"
import { useState } from "react"

export function FormSection() {
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  return (
    <form className="flex flex-col space-y-6">
      <div className="w-fit flex flex-col items-center space-y-4">
        <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-muted bg-muted flex items-center justify-center">
          {profileImage ? (
            <img
              src={profileImage || "/placeholder.svg"}
              alt="Profile preview"
              className="object-cover"
            />
          ) : (
            <User className="h-16 w-16 text-muted-foreground" />
          )}
        </div>
        <div className="flex items-center">
          <Label
            htmlFor="profile-image"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            <Upload className="h-4 w-4" />
            Upload Photo
          </Label>
          <Input
            id="profile-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Divider and spacing before readonly input */}
      <hr className="my-8 border-muted" />

      <div className="w-fit space-y-2 mt-4">
        <Label htmlFor="subname">Subname</Label>
        <Input
          id="subname"
          type="text"
          value="johndoe@suimail"
          readOnly
          className="bg-muted text-muted-foreground focus-visible:ring-0"
        />
      </div>
    </form>
  )
}

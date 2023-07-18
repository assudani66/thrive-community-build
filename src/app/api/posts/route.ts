import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {
        return NextResponse.json({'post':'posts'})
    } catch (error) {
        
    }
}
  